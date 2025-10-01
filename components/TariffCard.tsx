interface TariffCardProps {
   id: string;
   period: string;
   price: number;
   full_price: number;
   discount: number;
   text: string;
   isSelected: boolean;
   onSelect: () => void;
   showDiscount: boolean;
   isBest?: boolean;
}

export default function TariffCard({
   period,
   price,
   full_price,
   discount,
   text,
   isSelected,
   onSelect,
   showDiscount,
   isBest = false,
}: TariffCardProps) {
   return (
      <div
         className={`relative border rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] 
      px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 
      flex flex-col gap-4 sm:gap-5 cursor-pointer transition
      ${isSelected ? "border-2 border-[#FDB056] shadow-xl" : "border"}
      ${isBest
               ? "md:flex-row md:items-center md:justify-around md:gap-8 border-[#FDB056] bg-[#313637]"
               : "bg-[#313637] justify-between"}
    `}
         onClick={onSelect}
      >
         {isBest && (
            <span className="absolute top-2 right-3 text-[#FDB056] font-semibold px-3 py-1 rounded-b-lg text-sm sm:text-base">
               ХИТ!
            </span>
         )}

         <div className="flex flex-col items-center gap-4 sm:gap-6 md:items-start">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center md:text-left text-[#FFFFFF]">
               {period}
            </h2>

            {showDiscount ? (
               <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 text-center ">
                  <span className={`text-5xl font-bold ${isBest ? "text-[#FDB056]" : "text-[#FFFFFF]"}`}>
                     {price} ₽
                  </span>
                  <span className="text-gray-400 line-through text-2xl">{full_price} ₽</span>
                  <span className="text-white bg-[#e84444] px-2 py-1 rounded-b-md font-medium absolute top-0 left-10 text-lg">
                     -{discount}%
                  </span>
               </div>
            ) : (
               <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center my-3">
                  {full_price} ₽
               </span>
            )}
         </div>

         <p className={`text-sm sm:text-base lg:text-lg text-[#FFFFFF] ${isBest ? "md:w-80 lg:w-96 text-center md:text-left" : "text-center md:text-left"}`}>
            {text}
         </p>
      </div>
   );
}
