"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "@uiw/react-markdown-preview";

export default function MarkdownParser() {
  const [markdown, setMarkdown] = useState("");
  const outputRef = useRef(null);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const copyHTML = async () => {
    try {
      const reactElement = document.createElement("div");
      reactElement.innerHTML = outputRef.current?.innerHTML || "";
      await navigator.clipboard.writeText(reactElement.innerHTML);
      alert("HTML copied!");
    } catch (err) {
      console.error("Failed to copy HTML: ", err);
    }
  };

  const copyCleanText = async () => {
    try {
      // Get the rendered HTML content and convert to plain text
      const htmlContent = outputRef.current?.innerHTML || "";
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const cleanText = tempDiv.textContent || tempDiv.innerText || "";

      await navigator.clipboard.writeText(cleanText);
      alert("Output copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy output: ", err);
      alert("Failed to copy output");
    }
  };

  const sampleMarkdown = `# Welcome to Simple Markdown Parser

This is a simple **markdown parser** built using _vanilla JS_ and **Tailwind CSS**.

## Features

- Live markdown preview
- Copy plain text
- Copy HTML content
- Responsive UI
- Lightweight and fast

## Usage

1. Type or paste markdown in the left panel.
2. View live preview on the right.
3. Copy what you need!

## Example Code

\`\`\`js
function hello() {
  console.log("Hello, world!");
}
\`\`\`

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).`;

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-yellow-300 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">
          Simple Markdown Parser
        </h1>
        <nav className="mt-2 md:mt-0 space-x-4">
          <a
            href="#"
            className="font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Home
          </a>
          <a
            href="#tutorial"
            className="font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Tutorial
          </a>
          <a
            href="#about"
            className="font-medium text-gray-700 hover:text-gray-900 transition"
          >
            About
          </a>
          <a
            href="https://github.com/yourusername/simple-markdown-parser"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-gray-900 transition"
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Main Editor Section */}
      <section className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="editor flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-2">Markdown Input</h2>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            className="w-full h-96 p-4 border border-yellow-300 rounded-lg text-base resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Type or paste your markdown here..."
          />
        </div>

        <div className="preview flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div
            ref={outputRef}
            className="prose prose-yellow max-w-none border border-yellow-300 rounded-lg p-4 bg-white h-96 overflow-auto shadow-sm"
          >
            <ReactMarkdown
              source={markdown}
              style={{ backgroundColor: "transparent", color: "black" }}
              disableCopy={false}
            ></ReactMarkdown>
          </div>
          <div className="flex gap-5 mt-2">
            <button
              onClick={copyCleanText}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded shadow transition-colors"
            >
              Copy Clean Text
            </button>
            <button
              onClick={copyHTML}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded shadow transition-colors"
            >
              Copy HTML
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="p-6">
        <p className="text-lg">
          This is a{" "}
          <span className="font-semibold">simple markdown parser</span>. You can
          copy and paste your markdown into{" "}
          <span className="italic">HTML formatted content</span>.
        </p>
      </section>

      {/* Sample Markdown */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">Sample Markdown</h2>
        <div className="bg-white p-4 border border-yellow-200 rounded-lg overflow-auto text-sm shadow">
          <pre className="whitespace-pre-wrap">{sampleMarkdown}</pre>
        </div>
      </section>

      {/* Tutorial */}
      <section id="tutorial" className="p-6">
        <h2 className="text-xl font-bold mb-2">How to Use This</h2>
        <ol className="list-decimal list-inside space-y-1 text-base">
          <li>Paste or type markdown on the left.</li>
          <li>See the HTML preview on the right.</li>
          <li>Click the copy button for plain text or HTML.</li>
        </ol>
      </section>

      {/* About */}
      <section id="about" className="p-6">
        <h2 className="text-xl font-bold mb-2">About</h2>
        <p className="text-base leading-relaxed">
          I use AI tools like Postman daily to prompt APIs and analyze markdown
          responses. Most online markdown viewers are cluttered or don't support
          raw HTML copying. This tool was built to solve that problem with a
          clean interface and practical copy features.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-yellow-300 mt-6 shadow-inner">
        &copy; 2025 Simple Markdown Parser. All rights reserved.
      </footer>
    </div>
  );
}
