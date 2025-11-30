import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Bar, Legend, Cell } from 'recharts';
import { SlideLayout } from '../SlideLayout';
import { SlideProps } from '../../types';
import { MONI_DATA, HELE_DATA, DISASTER_DATA } from '../../constants';
import { Database, TrendingUp, TrendingDown, AlertOctagon } from 'lucide-react';

// --- Slide 5: Chapter 2 Cover ---
export const Slide5: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-tech-blue relative overflow-hidden">
       {/* Data Flow Background Effect */}
       <div className="absolute inset-0 flex justify-center gap-8 opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1 bg-gradient-to-b from-transparent via-tech-light to-transparent h-full"
              initial={{ y: -1000 }}
              animate={{ y: 1000 }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, ease: "linear" }}
            />
          ))}
       </div>
       
       <div className="z-10 text-right w-full pr-24">
         <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-harvest-gold to-white opacity-20 absolute -top-20 -right-10">02</h2>
           <h2 className="text-7xl font-bold text-white mb-4">02 洞察与发现</h2>
           <div className="h-2 w-32 bg-tech-light mb-6 ml-auto"></div>
           <p className="text-4xl text-gray-300 font-light tracking-widest">数据挖掘</p>
         </motion.div>
       </div>
    </div>
  );
};

// --- Slide 6: Polarization ---
export const Slide6: React.FC<SlideProps> = ({ step }) => {
  return (
    <SlideLayout title="产能两极分化：拒绝平均主义">
      <div className="flex w-full h-full items-center gap-8">
        
        {/* Left Chart: Moni (Growth) */}
        <motion.div 
          className="flex-1 bg-gray-800/30 p-4 rounded-xl border border-green-500/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-green-400 flex gap-2"><TrendingUp /> 摩尼站 (优)</h3>
             <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">持续扩张</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONI_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[5000, 9000]} />
                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* VS Icon */}
        <div className="text-4xl font-black italic text-gray-600">VS</div>

        {/* Right Chart: Hele (Decline) */}
        <motion.div 
          className="flex-1 bg-gray-800/30 p-4 rounded-xl border border-red-500/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-red-400 flex gap-2"><TrendingDown /> 合乐站 (劣)</h3>
             <span className="px-2 py-1 bg-red-900 text-red-300 text-xs rounded">持续萎缩</span>
          </div>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HELE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[2000, 5000]} />
                <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-6 text-xl text-tech-light font-bold"
      >
        结论：资源配置必须差异化，向优势区域倾斜
      </motion.div>
    </SlideLayout>
  );
};

// --- Slide 7: Fragility ---
export const Slide7: React.FC<SlideProps> = ({ step }) => {
  return (
    <SlideLayout title="脆弱性警示：线性模型的失效">
      <div className="w-full h-full flex flex-col items-center justify-center">
         <div className="w-4/5 h-96 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={DISASTER_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="year" stroke="#9ca3af" />
                <YAxis yAxisId="left" orientation="left" stroke="#f87171" label={{ value: '灾害面积', angle: -90, position: 'insideLeft', fill: '#f87171' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#60a5fa" domain={[60, 100]} label={{ value: '完成率%', angle: 90, position: 'insideRight', fill: '#60a5fa' }} />
                
                {/* Disaster Bar */}
                <Bar yAxisId="left" dataKey="disaster" fill="#ef4444" barSize={40} fillOpacity={0.6}>
                  {DISASTER_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fillOpacity={entry.year === '2022' ? 1 : 0.3} />
                  ))}
                </Bar>
                
                {/* Rate Line */}
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#60a5fa" strokeWidth={4} dot={{r: 6}} />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Highlight 2022 */}
            <motion.div 
               className="absolute top-10 left-[67%] w-24 h-64 border-2 border-yellow-400 rounded-lg bg-yellow-400/10"
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
            >
               <div className="absolute -top-10 left-0 w-full text-center text-yellow-400 font-bold bg-black/50 rounded">
                 <AlertOctagon className="inline mr-1 w-4 h-4"/>
                 气候突变
               </div>
            </motion.div>
         </div>

         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="mt-8 bg-gray-800 px-6 py-3 rounded-full border border-gray-600"
         >
           <span className="text-harvest-gold font-bold">核心发现：</span> 简单的线性趋势无法对抗突发气候因子，必须引入<span className="text-tech-light">非线性算法</span>。
         </motion.div>
      </div>
    </SlideLayout>
  );
};
