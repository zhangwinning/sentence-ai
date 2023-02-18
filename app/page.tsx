"use client";

import {useState} from "react";
// @ts-ignore
import {SSRProvider} from "react-bootstrap";

import Form from "./form";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCron = async (prompt: string, author: string) => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sentence: prompt, author}),
    });
    const data = await response.json();

    setResult(data.result);
    setLoading(false);
  };

  return (
    <SSRProvider>
      <main className="m-auto max-w-xl p-4 text-white">
        <div className="mt-8 border-b border-neutral-800 pb-3 text-center">
          <h1 className="text-3xl">言之有物，因人而异</h1>
          <p className="tracking-wider text-neutral-400">
            不同的视角，各具特色——一句话，不同的人会如何说呢
          </p>
        </div>
        <div className="mt-12">
          <h2 className="pb-3 text-xl">输入一句话</h2>
          <Form generateCron={generateCron} result={result} loading={loading}/>
        </div>
      </main>
    </SSRProvider>
  );
}
