import Timer from "./Timer";

interface HeaderProps {
  onExpire: () => void;
}

export default function Header({ onExpire }: HeaderProps) {
  return (
    <header className="sticky z-50 top-0 bg-[#1D5B43] text-white shadow-md p-4 flex-col flex justify-between items-center">
      <h2 className="text-2xl text-center font-bold">Успейте открыть пробную неделю</h2>
      <Timer onExpire={onExpire} />
    </header>
  );
}
