import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, rawMaterials } from '@/data/mockData';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Halo! Saya AI Assistant CostFlow. Saya siap membantu Anda mencatat transaksi bisnis hari ini.

**Contoh pesan untuk penjualan:**
• "Saya telah menjual 5 Kopi Susu Gula Aren"
• "Terjual 3 Matcha Latte hari ini"
• "Penjualan 10 Es Teh Manis"

**Contoh pesan untuk pengeluaran HPP:**
• "Saya membeli 3 kg biji kopi"
• "Pembelian 5 liter susu UHT"
• "Bayar gaji barista Rp150.000"

**Contoh pesan untuk beban operasional:**
• "Bayar listrik bulan ini Rp500.000"
• "Pembayaran sewa tempat Rp5.000.000"`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const parseTransaction = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for sales transaction
    const salesKeywords = ['jual', 'terjual', 'penjualan', 'sold'];
    const isSale = salesKeywords.some(keyword => lowerInput.includes(keyword));
    
    if (isSale) {
      // Try to match product
      for (const product of products) {
        if (lowerInput.includes(product.name.toLowerCase())) {
          // Extract quantity
          const quantityMatch = input.match(/(\d+)/);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
          const total = quantity * product.sellingPrice;
          const profit = quantity * (product.sellingPrice - product.hpp);
          
          toast.success('Transaksi dicatat!', {
            description: `${quantity}x ${product.name}`,
          });
          
          return `✅ **Transaksi Penjualan Dicatat!**

📦 **Produk:** ${product.name}
📊 **Jumlah:** ${quantity} ${product.unit}
💰 **Harga Satuan:** ${formatCurrency(product.sellingPrice)}
💵 **Total Penjualan:** ${formatCurrency(total)}

📈 **Analisis HPP:**
• HPP per unit: ${formatCurrency(product.hpp)}
• Total HPP: ${formatCurrency(quantity * product.hpp)}
• **Profit Kotor:** ${formatCurrency(profit)}
• **Margin:** ${product.margin}%

Stok ${product.name} berkurang ${quantity} unit.`;
        }
      }
      
      return `⚠️ Maaf, saya tidak menemukan produk tersebut dalam database. 

Produk yang tersedia:
${products.map(p => `• ${p.name} - ${formatCurrency(p.sellingPrice)}`).join('\n')}

Silakan coba lagi dengan nama produk yang benar.`;
    }
    
    // Check for expense transaction
    const expenseKeywords = ['beli', 'bayar', 'pembelian', 'pembayaran', 'biaya'];
    const isExpense = expenseKeywords.some(keyword => lowerInput.includes(keyword));
    
    if (isExpense) {
      // Try to match raw material
      for (const material of rawMaterials) {
        if (lowerInput.includes(material.name.toLowerCase())) {
          const quantityMatch = input.match(/(\d+)/);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
          const total = quantity * material.pricePerUnit;
          
          const categoryLabels: Record<string, string> = {
            bahan_baku: 'Bahan Baku (HPP)',
            tenaga_kerja: 'Tenaga Kerja Langsung (HPP)',
            overhead: 'Overhead Produksi (HPP)',
            operasional: 'Beban Operasional',
            administrasi: 'Beban Administrasi',
          };
          
          const isHpp = ['bahan_baku', 'tenaga_kerja', 'overhead'].includes(material.category);
          
          toast.success('Pengeluaran dicatat!', {
            description: `${material.name} - ${formatCurrency(total)}`,
          });
          
          return `✅ **Transaksi Pengeluaran Dicatat!**

📦 **Item:** ${material.name}
📂 **Kategori:** ${categoryLabels[material.category]}
📊 **Jumlah:** ${quantity} ${material.unit}
💰 **Harga Satuan:** ${formatCurrency(material.pricePerUnit)}
💵 **Total Pengeluaran:** ${formatCurrency(total)}

${isHpp ? '📊 **Termasuk dalam perhitungan HPP**' : '📊 **Tidak termasuk HPP (Beban Operasional)**'}

Transaksi ini telah dicatat dan akan muncul di laporan laba rugi.`;
        }
      }
      
      // Check for amount mentioned directly (e.g., "bayar listrik Rp500.000")
      const amountMatch = input.match(/[Rr][Pp]?\s*\.?\s*([\d.,]+)/);
      if (amountMatch) {
        const amount = parseInt(amountMatch[1].replace(/[.,]/g, ''));
        
        toast.success('Pengeluaran dicatat!', {
          description: `Pengeluaran - ${formatCurrency(amount)}`,
        });
        
        return `✅ **Transaksi Pengeluaran Dicatat!**

💵 **Total Pengeluaran:** ${formatCurrency(amount)}
📝 **Deskripsi:** ${input}

Transaksi ini telah dicatat. Untuk kategorisasi yang lebih akurat, tambahkan item ke Data Pengeluaran terlebih dahulu.`;
      }
      
      return `⚠️ Maaf, saya tidak menemukan item tersebut dalam database.

Item pengeluaran yang tersedia:
${rawMaterials.map(m => `• ${m.name} - ${formatCurrency(m.pricePerUnit)}/${m.unit}`).join('\n')}

Atau sebutkan nominal langsung, contoh: "Bayar listrik Rp500.000"`;
    }
    
    // Default response
    return `Saya tidak yakin dengan pesan Anda. Silakan gunakan format berikut:

**Untuk Penjualan:**
"Jual [jumlah] [nama produk]"
Contoh: "Jual 5 Kopi Susu Gula Aren"

**Untuk Pengeluaran:**
"Beli [jumlah] [nama bahan]" atau "Bayar [item] Rp[nominal]"
Contoh: "Beli 3 kg biji kopi" atau "Bayar listrik Rp500.000"

Ketik "help" untuk bantuan lebih lanjut.`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = parseTransaction(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-1">Chat AI - Transaksi Harian</h1>
          <p className="text-muted-foreground">
            Kirim pesan transaksi penjualan atau pengeluaran untuk dicatat otomatis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden flex flex-col h-[calc(100vh-14rem)]"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-primary/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">AI Assistant - CostFlow</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by CostFlow AI
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'glass-surface rounded-bl-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'ai' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content.split('\n').map((line, i) => {
                        // Simple markdown-like parsing
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={i} className="font-bold">{line.slice(2, -2)}</p>;
                        }
                        if (line.startsWith('• ')) {
                          return <p key={i} className="ml-2">{line}</p>;
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass-surface rounded-2xl rounded-bl-sm p-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik transaksi... (contoh: Jual 5 Kopi Susu Gula Aren)"
                className="flex-1"
              />
              <Button onClick={handleSend} className="gap-2">
                <Send className="w-4 h-4" />
                Kirim
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AIChat;
