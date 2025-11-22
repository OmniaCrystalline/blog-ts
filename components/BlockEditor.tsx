'use client'
import { useState } from 'react'
import Image from 'next/image'
import './BlockEditor.css'

interface Block {
    id: string
    type: 'heading' | 'paragraph' | 'image' | 'quote'
    content: string
    level?: number // for headings
    src?: string // for images
}

interface BlockEditorProps {
    onChange: (blocks: Block[]) => void
    initialBlocks?: Block[]
}

export default function BlockEditor({ onChange, initialBlocks = [] }: BlockEditorProps) {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
    const [activeBlockId, setActiveBlockId] = useState<string | null>(null)

    // Don't automatically call onChange - let user control when to save
    // useEffect(() => {
    //     onChange(blocks)
    // }, [blocks, onChange])

    const addBlock = (type: Block['type'], level?: number) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            content: '',
            level,
        }

        const newBlocks = [...blocks, newBlock]
        setBlocks(newBlocks)
        setActiveBlockId(newBlock.id)
    }

    const updateBlock = (id: string, content: string) => {
        const newBlocks = blocks.map(block =>
            block.id === id ? { ...block, content } : block
        )
        setBlocks(newBlocks)
    }

    const deleteBlock = (id: string) => {
        const newBlocks = blocks.filter(block => block.id !== id)
        setBlocks(newBlocks)
    }

    const moveBlock = (id: string, direction: 'up' | 'down') => {
        const index = blocks.findIndex(block => block.id === id)
        if (index === -1) return

        const newBlocks = [...blocks]
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        if (targetIndex >= 0 && targetIndex < blocks.length) {
            [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
            setBlocks(newBlocks)
        }
    }

    const renderBlock = (block: Block) => {
        const isActive = activeBlockId === block.id

        return (
            <div key={block.id} data-block-id={block.id} className={`block-item ${isActive ? 'active' : ''}`}>
                <div className="block-controls">
                    <button onClick={() => deleteBlock(block.id)}>×</button>
                    <button onClick={() => moveBlock(block.id, 'up')}>↑</button>
                    <button onClick={() => moveBlock(block.id, 'down')}>↓</button>
                </div>

                <div className="block-content">
                    {block.type === 'heading' && (
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            placeholder={`Heading ${block.level}`}
                            className={`heading-input h${block.level}`}
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    addBlock('paragraph')
                                }
                            }}
                        />
                    )}

                    {block.type === 'paragraph' && (
                        <textarea
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            placeholder="Enter paragraph text..."
                            className="paragraph-input"
                            onFocus={() => setActiveBlockId(block.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.ctrlKey) {
                                    e.preventDefault()
                                    addBlock('paragraph')
                                }
                            }}
                        />
                    )}

                    {block.type === 'quote' && (
                        <textarea
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            placeholder="Enter quote..."
                            className="quote-input"
                            onFocus={() => setActiveBlockId(block.id)}
                        />
                    )}

                    {block.type === 'image' && (
                        <div className="image-block">
                            <input
                                type="url"
                                value={block.src || ''}
                                onChange={(e) => {
                                    const newBlocks = blocks.map(b =>
                                        b.id === block.id ? { ...b, src: e.target.value } : b
                                    )
                                    setBlocks(newBlocks)
                                    onChange(newBlocks)
                                }}
                                placeholder="Image URL"
                                className="image-url-input"
                            />
                            {block.src && (
                                <Image 
                                    src={block.src} 
                                    alt="Block image" 
                                    width={500} 
                                    height={300} 
                                    className="block-image"
                                    unoptimized={block.src.startsWith('http')}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="block-editor">
            <div className="block-toolbar">
                <button onClick={() => addBlock('heading', 1)}>H1</button>
                <button onClick={() => addBlock('heading', 2)}>H2</button>
                <button onClick={() => addBlock('heading', 3)}>H3</button>
                <button onClick={() => addBlock('paragraph')}>Paragraph</button>
                <button onClick={() => addBlock('quote')}>Quote</button>
                <button onClick={() => addBlock('image')}>Image</button>
            </div>

            <div className="blocks-container">
                {blocks.length === 0 ? (
                    <div className="empty-state">
                        <p>Click a button above to add your first block</p>
                    </div>
                ) : (
                    blocks.map(renderBlock)
                )}
            </div>
        </div>
    )
}
