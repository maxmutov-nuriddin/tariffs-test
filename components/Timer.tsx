import { useEffect, useState } from "react";

interface TimerProps {
   onExpire: () => void;
}

export default function Timer({ onExpire }: TimerProps) {
   const [timeLeft, setTimeLeft] = useState(900);

   useEffect(() => {
      if (timeLeft <= 0) {
         onExpire();
         return;
      }

      const interval = setInterval(() => {
         setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
   }, [timeLeft]);

   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;

   const danger = timeLeft <= 180;

   return (
      <div
         className={`font-bold text-4xl ${danger ? "text-red-600 animate-pulse" : "text-[#FFBB00] "
            }`}
      >
         + {minutes}:{seconds.toString().padStart(2, "0")} +
      </div>
   );
}
