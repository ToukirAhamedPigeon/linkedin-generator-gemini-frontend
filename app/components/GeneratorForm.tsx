'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function GeneratorForm() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate`,
        { topic, language }
      );
      setResult(res.data.post);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-700 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
            placeholder="e.g. AI in Healthcare"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-700 px-3 py-2 rounded bg-gray-800 text-white"
          >
            <option>English</option>
            <option>Bengali</option>
            <option>Spanish</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {result && (
        <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Generated Post:</h3>
            <button
              onClick={handleCopy}
              className="ml-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
