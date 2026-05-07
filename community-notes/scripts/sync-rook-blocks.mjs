#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const SKIP = new Set([
	"_partials",
	"scripts",
	"ai-skills",
	"node_modules",
	".git",
]);

const HEADER = readFileSync(join(ROOT, "_partials/header.md"), "utf8").trim();
const FOOTER = readFileSync(join(ROOT, "_partials/footer.md"), "utf8").trim();

function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		if (SKIP.has(name) || name.startsWith(".")) continue;
		const p = join(dir, name);
		const s = statSync(p);
		if (s.isDirectory()) out.push(...walk(p));
		else if (name.endsWith(".md")) out.push(p);
	}
	return out;
}

function titleOf(filePath) {
	const text = readFileSync(filePath, "utf8");
	const stripped = text.replace(/```[\s\S]*?```/g, "");
	const h1 = stripped.match(/^#\s+(.+)$/m);
	if (h1) return h1[1].trim();
	const h2 = stripped.match(/^##\s+(.+)$/m);
	if (h2) return h2[1].trim();
	return basename(filePath, ".md");
}

function siblingsFor(filePath) {
	const dir = dirname(filePath);
	const me = basename(filePath);
	return readdirSync(dir)
		.filter(
			(n) =>
				n.endsWith(".md") &&
				n !== me &&
				n !== "README.md" &&
				!n.startsWith("_"),
		)
		.sort()
		.map((n) => ({ file: n, title: titleOf(join(dir, n)) }));
}

function replaceBlock(content, name, replacement) {
	if (replacement.trim() === "") {
		const stripRe = new RegExp(
			`<!-- ROOK:${name} -->[\\s\\S]*?<!-- /ROOK:${name} -->\\n*`,
		);
		if (!stripRe.test(content)) return { content, replaced: false };
		return { content: content.replace(stripRe, ""), replaced: true };
	}
	const re = new RegExp(
		`<!-- ROOK:${name} -->[\\s\\S]*?<!-- /ROOK:${name} -->`,
	);
	if (!re.test(content)) return { content, replaced: false };
	const next = content.replace(
		re,
		`<!-- ROOK:${name} -->\n${replacement}\n<!-- /ROOK:${name} -->`,
	);
	return { content: next, replaced: true };
}

const files = walk(ROOT);
let changed = 0;
const missing = [];

for (const f of files) {
	const rel = relative(ROOT, f);
	let original = readFileSync(f, "utf8");
	let updated = original;
	const flags = { header: false, footer: false, series: null };

	let r = replaceBlock(updated, "HEADER", HEADER);
	updated = r.content;
	flags.header = r.replaced;

	const inSubdir = rel.includes("/");
	const isReadme = basename(f) === "README.md";
	if (inSubdir && !isReadme) {
		const sibs = siblingsFor(f);
		if (sibs.length) {
			const links = sibs.map((s) => `[${s.title}](${s.file})`).join(" · ");
			const block = `*More in this series: ${links}.*`;
			r = replaceBlock(updated, "SERIES", block);
			updated = r.content;
			flags.series = r.replaced;
		}
	}

	r = replaceBlock(updated, "FOOTER", FOOTER);
	updated = r.content;
	flags.footer = r.replaced;

	const expected = [];
	if (HEADER) expected.push("header");
	if (FOOTER) expected.push("footer");
	if (flags.series === false) expected.push("series");
	const missingHere = expected.filter((k) => !flags[k]);
	if (missingHere.length) missing.push({ rel, missingHere });

	if (updated !== original) {
		writeFileSync(f, updated);
		changed++;
		console.log(`updated ${rel}`);
	}
}

console.log(
	`\n${changed} file(s) updated, ${files.length - changed} unchanged`,
);
if (missing.length) {
	console.log(`\nfiles missing one or more markers:`);
	for (const m of missing)
		console.log(`  ${m.rel}: missing ${m.missingHere.join(", ")}`);
	process.exit(1);
}
