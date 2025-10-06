// app/appunti/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AppuntiPage() {
  const [note, setNote] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Carica la nota salvata solo dopo il rendering lato client
    setIsClient(true);
    const savedNote = localStorage.getItem('studai-note');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem('studai-note', e.target.value);
  };

  if (!isClient) {
    return null; // O un loader
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Appunti</h1>
      <p className="mt-2 text-gray-600">Crea e modifica le tue note in formato Markdown.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh]">
        {/* Editor */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Editor</h2>
          <textarea
            value={note}
            onChange={handleNoteChange}
            className="flex-1 w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Scrivi qui i tuoi appunti..."
          />
        </div>
        
        {/* Anteprima */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Anteprima</h2>
          <div className="prose flex-1 w-full p-4 border rounded-lg bg-white overflow-y-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
