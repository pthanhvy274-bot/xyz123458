import React from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LabelList } from 'recharts';
import { SlideLayout } from '../SlideLayout';
import { SlideProps } from '../../types';
import { RESULT_DATA } from '../../constants';
import { CalendarCheck, ShieldCheck, Cpu, ArrowUpRight, MonitorPlay } from 'lucide-react';

// --- Slide 11: Chapter 4 Cover ---
export const Slide11: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-tech-blue relative">
       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
       
       <div className="z-10 flex flex-col items-center">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
            <div className="w-32 h-32 rounded-full border-4 border-harvest-gold flex items-center justify-center mb-8 bg-black/30 backdrop-blur">
               <CalendarCheck size={64} className="text-harvest-gold" />
            </div>
         </motion.div>
         
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="text-center"
         >
           <h2 className="text-7xl font-bold text-white mb-4">04 实测与展望</h2>
           <p className="text-3xl text-tech-accent tracking-widest">2025年 应用验证</p>
         </motion.div>
       </div>
    </div>
  );
};

// --- Slide 12: 2025 Results (Core) ---
export const Slide12: React.FC<SlideProps> = ({ step }) => {
  return (
    <SlideLayout title="实测交卷：2025年数据复盘">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 w-full bg-gray-900/40 rounded-xl p-4 border border-gray-700">
           <ResponsiveContainer width="100%" height="100%">
             <ComposedChart data={RESULT_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
               <CartesianGrid stroke="#374151" strokeDasharray="3 3" vertical={false} />
               <XAxis dataKey="name" stroke="#9ca3af" tick={{fontSize: 14}} />
               <YAxis stroke="#9ca3af" label={{ value: '产量 (万公斤)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
               <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} 
                  itemStyle={{ color: '#fff' }}
               />
               <Legend verticalAlign="top" height={36}/>
               
               {/* Actual Data (Bars) */}
               <Bar dataKey="actual" name="实际收购量 (人工)" barSize={40} fill="#1e3a8a" radius={[4, 4, 0, 0]}>
                 <LabelList dataKey="actual" position="top" fill="#60a5fa" fontSize={12} formatter={(val: number) => val.toFixed(1)} />
               </Bar>

               {/* Predicted Data (Line) */}
               <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="模型预测量" 
                  stroke="#fb923c" 
                  strokeWidth={4} 
                  dot={{r: 5, fill: '#fb923c', strokeWidth: 2, stroke: '#fff'}}
                  animationDuration={2000}
               />
             </ComposedChart>
           </ResponsiveContainer>
        </div>

        {/* Annotations */}
        <div className="h-24 flex justify-around items-center mt-4">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
             className="bg-gray-800 p-3 rounded border-l-4 border-green-500"
           >
              <div className="text-gray-400 text-sm">摩尼站误差</div>
              <div className="text-2xl font-bold text-green-400">1.1%</div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
             className="text-white text-lg font-bold bg-tech-blue px-6 py-2 rounded-full border border-tech-light shadow-[0_0_15px_rgba(14,165,233,0.3)]"
           >
              趋势高度拟合
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
             className="bg-gray-800 p-3 rounded border-l-4 border-green-500"
           >
              <div className="text-gray-400 text-sm">合乐站误差</div>
              <div className="text-2xl font-bold text-green-400">1.5%</div>
           </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};

// --- Slide 13: Value Summary ---
export const Slide13: React.FC<SlideProps> = ({ step }) => {
  const cards = [
    { title: "科学基准线", icon: <ShieldCheck size={40}/>, desc: "替代无休止的人为博弈" },
    { title: "数字参谋", icon: <Cpu size={40}/>, desc: "辅助决策而非完全取代" },
    { title: "动态修正", icon: <ArrowUpRight size={40}/>, desc: "未来引入实时气象预报" },
  ];

  return (
    <SlideLayout title="核心价值：重构分配逻辑">
       <div className="w-full h-full flex items-center justify-center gap-10">
          {cards.map((c, i) => (
             <motion.div
               key={i}
               className="w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-700 shadow-xl relative overflow-hidden group"
               initial={{ opacity: 0, y: 50 }}
               animate={step >= i ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: i * 0.2 }}
             >
                <div className="absolute inset-0 bg-tech-light opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="mb-8 text-tech-accent p-6 bg-gray-800 rounded-full shadow-inner">
                   {c.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{c.title}</h3>
                <p className="text-center text-gray-400 leading-relaxed">
                  {c.desc}
                </p>
             </motion.div>
          ))}
       </div>
    </SlideLayout>
  );
};

// --- Slide Demo: Transition to Live System ---
export const SlideDemo: React.FC<SlideProps> = () => {
  return (
    <SlideLayout title="系统演示">
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* Background Pulse */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="w-[500px] h-[500px] bg-tech-light rounded-full opacity-5 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 mb-12"
        >
          <div className="w-64 h-64 bg-gradient-to-tr from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.3)] border border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]"></div>
             <MonitorPlay size={100} className="text-white drop-shadow-lg z-10" />
             
             {/* Scanning Line */}
             <motion.div 
               className="absolute top-0 left-0 w-full h-1 bg-tech-light shadow-[0_0_15px_#0ea5e9]"
               animate={{ top: ['0%', '100%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </motion.div>

        <motion.h2 
          className="text-5xl font-bold text-white tracking-widest mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          进入系统实操演示
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-400 font-mono"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          System Demonstration
        </motion.p>
      </div>
    </SlideLayout>
  );
};

// --- Slide 14: End ---
export const Slide14: React.FC<SlideProps> = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-50"></div>
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5 }}
         className="z-10 text-center"
       >
         <h1 className="text-6xl font-bold text-white mb-8 tracking-widest">感谢聆听</h1>
         <div className="w-24 h-1 bg-harvest-gold mx-auto mb-8"></div>
         <p className="text-2xl text-gray-400">请批评指正</p>
         
         <div className="mt-20 text-sm text-gray-600">
            按 <kbd className="bg-gray-800 px-2 py-1 rounded text-white">ESC</kbd> 重置演示
         </div>
       </motion.div>
    </div>
  );
};