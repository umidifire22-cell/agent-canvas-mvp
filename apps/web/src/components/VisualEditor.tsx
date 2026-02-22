"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Type, Image as ImageIcon, Crosshair, Plus, Trash2, Save, X } from 'lucide-react'

export type TemplateElement = {
    id: string;
    type: 'text' | 'image' | 'rect';
    x: number;
    y: number;
    width?: number;
    height?: number;
    color?: string;
    content?: string;
    fontSize?: number;
    isVariable?: boolean;
    variableName?: string;
    url?: string;
}

interface VisualEditorProps {
    onSave: (name: string, elements: TemplateElement[]) => void;
    onCancel: () => void;
}

export function VisualEditor({ onSave, onCancel }: VisualEditorProps) {
    const [name, setName] = useState('')
    const [elements, setElements] = useState<TemplateElement[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const scale = 0.5 // Scale down for preview

    const addText = () => {
        const id = Math.random().toString(36).substr(2, 9)
        setElements([...elements, {
            id, type: 'text', x: 100, y: 100, content: 'New Text', fontSize: 60, color: '#FFFFFF', isVariable: false, variableName: 'text_' + id
        }])
        setSelectedId(id)
    }

    const addImage = () => {
        const url = prompt("Enter image URL (e.g. background from Canva):")
        if (!url) return
        const id = Math.random().toString(36).substr(2, 9)
        setElements([{
            id, type: 'image', x: 0, y: 0, width: 1080, height: 1080, url
        }, ...elements])
        setSelectedId(id)
    }

    const updateElement = (id: string, updates: Partial<TemplateElement>) => {
        setElements(els => els.map(el => el.id === id ? { ...el, ...updates } : el))
    }

    const deleteElement = (id: string) => {
        setElements(els => els.filter(el => el.id !== id))
        if (selectedId === id) setSelectedId(null)
    }

    const selectedElement = elements.find(el => el.id === selectedId)

    return (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 mt-6 shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Template Name..."
                    className="bg-black border border-white/20 rounded-lg px-4 py-2 text-white w-64 focus:border-[#2997FF] outline-none"
                />
                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-4 py-2 border border-white/20 rounded-lg text-white/80 hover:bg-white/5 transition-colors flex items-center gap-2">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                    <button onClick={() => onSave(name, elements)} disabled={!name} className="px-4 py-2 bg-[#2997FF] rounded-lg text-white font-medium hover:bg-[#5AC8FA] transition-colors flex items-center gap-2 disabled:opacity-50">
                        <Save className="w-4 h-4" /> Save Template
                    </button>
                </div>
            </div>

            <div className="flex xl:flex-row flex-col gap-8">
                {/* TOOLBAR */}
                <div className="flex xl:flex-col gap-3 shrink-0">
                    <button onClick={addText} className="flex flex-col items-center justify-center w-20 h-20 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                        <Type className="w-6 h-6 mb-1 text-[#2997FF]" />
                        <span className="text-[11px] text-white/70">Text</span>
                    </button>
                    <button onClick={addImage} className="flex flex-col items-center justify-center w-20 h-20 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                        <ImageIcon className="w-6 h-6 mb-1 text-[#BF5AF2]" />
                        <span className="text-[11px] text-white/70">Image</span>
                    </button>
                </div>

                {/* CANVAS */}
                <div className="bg-black border border-white/20 rounded-xl flex items-center justify-center overflow-hidden shrink-0" style={{ width: 1080 * scale, height: 1080 * scale }}>
                    <div
                        className="relative bg-white shadow-2xl overflow-hidden"
                        style={{ width: 1080, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left' }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setSelectedId(null)
                        }}
                    >
                        {/* 1080x1080 bounds */}
                        {elements.map((el) => {
                            const isSelected = selectedId === el.id;

                            if (el.type === 'image') {
                                return (
                                    <motion.img
                                        key={el.id}
                                        src={el.url}
                                        drag
                                        dragMomentum={false}
                                        onDragEnd={(e, info) => updateElement(el.id, { x: el.x + info.offset.x, y: el.y + info.offset.y })}
                                        onClick={() => setSelectedId(el.id)}
                                        style={{
                                            position: 'absolute', left: el.x, top: el.y, width: el.width, height: el.height,
                                            border: isSelected ? '4px solid #2997FF' : 'none'
                                        }}
                                        alt=""
                                    />
                                )
                            }
                            if (el.type === 'text') {
                                return (
                                    <motion.div
                                        key={el.id}
                                        drag
                                        dragMomentum={false}
                                        onDragEnd={(e, info) => updateElement(el.id, { x: el.x + info.offset.x, y: el.y + info.offset.y })}
                                        onClick={() => setSelectedId(el.id)}
                                        style={{
                                            position: 'absolute', left: el.x, top: el.y, color: el.color, fontSize: el.fontSize, fontFamily: 'Inter',
                                            padding: 10, border: isSelected ? '4px solid #2997FF' : '2px dashed transparent',
                                            whiteSpace: 'nowrap', cursor: 'grab'
                                        }}
                                    >
                                        {el.content}
                                    </motion.div>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>

                {/* PROPERTIES */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5">
                    {selectedElement ? (
                        <div className="space-y-5">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <h3 className="text-white font-medium">Element Properties</h3>
                                <button onClick={() => deleteElement(selectedElement.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/10 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] text-white/50 mb-1">X Position</label>
                                    <input type="number" value={Math.round(selectedElement.x)} onChange={e => updateElement(selectedElement.id, { x: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-white/50 mb-1">Y Position</label>
                                    <input type="number" value={Math.round(selectedElement.y)} onChange={e => updateElement(selectedElement.id, { y: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                                </div>
                            </div>

                            {selectedElement.type === 'text' && (
                                <>
                                    <div>
                                        <label className="block text-[11px] text-white/50 mb-1">Text Content</label>
                                        <input type="text" value={selectedElement.content} onChange={e => updateElement(selectedElement.id, { content: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] text-white/50 mb-1">Font Size (px)</label>
                                            <input type="number" value={selectedElement.fontSize} onChange={e => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-white/50 mb-1">Color</label>
                                            <input type="color" value={selectedElement.color} onChange={e => updateElement(selectedElement.id, { color: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded h-[38px] p-1 cursor-pointer" />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5 mt-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={selectedElement.isVariable} onChange={e => updateElement(selectedElement.id, { isVariable: e.target.checked })} className="w-4 h-4 accent-[#2997FF]" />
                                            <span className="text-[13px] text-white">Dynamic Variable (API)</span>
                                        </label>
                                        {selectedElement.isVariable && (
                                            <div className="mt-3">
                                                <label className="block text-[11px] text-white/50 mb-1">Variable Name (e.g. title)</label>
                                                <input type="text" value={selectedElement.variableName} onChange={e => updateElement(selectedElement.id, { variableName: e.target.value })} className="w-full bg-black/50 border-[#2997FF]/30 border rounded p-2 text-[#2997FF] font-mono" />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {selectedElement.type === 'image' && (
                                <div>
                                    <label className="block text-[11px] text-white/50 mb-1">Image URL</label>
                                    <input type="text" value={selectedElement.url} onChange={e => updateElement(selectedElement.id, { url: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white/30">
                            <Crosshair className="w-8 h-8 mb-2" />
                            <p className="text-[13px]">Select an element to edit</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
