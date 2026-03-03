/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Trophy, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(gamesData.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Marquee Header */}
      <div className="bg-[#00FF00] text-black py-2 overflow-hidden border-b-2 border-black">
        <div className="marquee-track whitespace-nowrap font-display text-xl uppercase">
          <span className="mx-4">Nexus Games Unblocked</span>
          <span className="mx-4">★</span>
          <span className="mx-4">Play Anywhere</span>
          <span className="mx-4">★</span>
          <span className="mx-4">No Downloads</span>
          <span className="mx-4">★</span>
          <span className="mx-4">Instant Fun</span>
          <span className="mx-4">★</span>
          <span className="mx-4">Nexus Games Unblocked</span>
          <span className="mx-4">★</span>
          <span className="mx-4">Play Anywhere</span>
          <span className="mx-4">★</span>
          <span className="mx-4">No Downloads</span>
          <span className="mx-4">★</span>
          <span className="mx-4">Instant Fun</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00FF00] flex items-center justify-center rounded-none brutal-border">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <h1 className="font-display text-3xl uppercase tracking-tighter">Nexus Games</h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/20 px-10 py-2 focus:outline-none focus:border-[#00FF00] transition-colors"
            />
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-[#00FF00] text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="game-grid">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#151515] border border-white/10 overflow-hidden cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="w-full py-2 bg-[#00FF00] text-black font-bold uppercase text-sm">
                      Play Now
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF00]">
                      {game.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl uppercase mb-1">{game.title}</h3>
                  <p className="text-white/50 text-xs line-clamp-2">{game.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 font-mono uppercase tracking-widest">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="font-display text-2xl uppercase mb-4">Nexus Games</h2>
            <p className="text-white/40 text-sm">
              The ultimate destination for unblocked web games. Fast, free, and always accessible.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#00FF00] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#00FF00] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00FF00] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Connect</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-[#00FF00] hover:text-black transition-all cursor-pointer">
                <Trophy size={16} />
              </div>
              <div className="w-8 h-8 bg-white/5 flex items-center justify-center hover:bg-[#00FF00] hover:text-black transition-all cursor-pointer">
                <Flame size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] font-mono uppercase tracking-widest text-white/20">
          © 2024 Nexus Games. All rights reserved.
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#111] flex flex-col border border-white/20"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <h2 className="font-display text-2xl uppercase">{selectedGame.title}</h2>
                  <span className="px-2 py-0.5 bg-white/10 text-[10px] font-mono uppercase tracking-widest">
                    {selectedGame.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const iframe = document.getElementById('game-iframe');
                      if (iframe?.requestFullscreen) iframe.requestFullscreen();
                    }}
                    className="p-2 hover:bg-white/10 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black relative">
                <iframe
                  id="game-iframe"
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>
              <div className="p-4 bg-[#151515] border-t border-white/10">
                <p className="text-white/60 text-sm">{selectedGame.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
