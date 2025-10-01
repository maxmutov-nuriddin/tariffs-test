/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { getTariffs } from "../lib/api";
import Header from "../components/Header";
import TariffCard from "../components/TariffCard";

interface Tariff {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
}

export default function HomePage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDiscount, setShowDiscount] = useState(true);
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    alert("Покупка оформлена!");
  }

  useEffect(() => {
    getTariffs().then((data) => {
      setTariffs(data);
    });
  }, []);

  function handleExpire() {
    setShowDiscount(false);
  }

  return (
    <div>
      <Header onExpire={handleExpire} />

      <main className="container px-4 py-8">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center md:text-left mb-8">
          Выбери подходящий для себя{" "}
          <span className="text-[#FDB056]">тариф</span>
        </h1>

        {/* Блок с картинкой и тарифами */}
        <div className="flex flex-col lg:flex-row items-center md:items-start gap-8 w-full">

          {/* Левая часть (картинка тренера) */}
          <div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
            <img
              src="/hero-img.png"
              alt="Тренер"
              className="w-64 sm:w-72 md:w-80 lg:w-96"
            />
          </div>

          {/* Правая часть (тарифы + кнопки) */}
          <div className="flex flex-col gap-6 w-full">

            {/* Лучший тариф */}
            {tariffs.filter((t) => t.is_best).map((t, idx) => {
              const duplicate = tariffs.filter(x => x.id === t.id).length > 1;
              const displayId = duplicate ? `${t.id}-${idx}` : t.id;
              return (
                <TariffCard
                  key={`best-${displayId}`}
                  id={displayId}
                  period={t.period}
                  price={t.price}
                  full_price={t.full_price}
                  discount={Math.round(100 - (t.price / t.full_price) * 100)}
                  text={t.text}
                  isSelected={selectedId === displayId}
                  onSelect={() =>
                    setSelectedId(selectedId === displayId ? null : displayId)
                  }
                  showDiscount={showDiscount}
                  isBest={t.is_best}
                />
              );
            })}

            {/* Остальные тарифы */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tariffs.filter((t) => !t.is_best).map((t, idx) => {
                const duplicate = tariffs.filter(x => x.id === t.id).length > 1;
                const displayId = duplicate ? `${t.id}-${idx}` : t.id;
                return (
                  <TariffCard
                    key={`small-${displayId}`}
                    id={displayId}
                    period={t.period}
                    price={t.price}
                    full_price={t.full_price}
                    discount={Math.round(100 - (t.price / t.full_price) * 100)}
                    text={t.text}
                    isSelected={selectedId === displayId}
                    onSelect={() =>
                      setSelectedId(selectedId === displayId ? null : displayId)
                    }
                    showDiscount={showDiscount}
                    isBest={t.is_best}
                  />
                );
              })}
            </div>

            {/* Подсказка */}
            <div className="flex items-start bg-[#2D3233] rounded-xl w-full gap-3 py-2 px-4">
              <span className="text-[#FDB056] text-xl">!</span>
              <div className="text-white">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
              </div>
            </div>

            {/* Форма согласия и кнопка купить */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checked"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-[#FDB056] cursor-pointer"
                />
                <label htmlFor="checked" className="text-sm text-[#CDCDCD] cursor-pointer">
                  Я согласен с{" "}
                  <a href="#" className="underline">
                    офертой рекуррентных платежей
                  </a>{" "}
                  и{" "}
                  <a href="#" className="underline">
                    Политикой конфиденциальности
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreed}
                className={`px-6 py-3 w-full md:w-80 rounded-xl font-semibold transition ${agreed
                  ? "bg-[#FDB056] text-black hover:opacity-90"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
              >
                Купить
              </button>
            </form>

            <p className="text-[#9B9B9B] text-sm">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
          </div>
        </div>

        {/* Гарантия возврата */}
        <div className="border border-[#484D4E] rounded-2xl p-3 mt-10">
          <button className="text-[#81FE95] border border-[#81FE95] rounded-2xl px-3 py-1">
            гарантия возврата 30 дней
          </button>
          <p className="text-[#DCDCDC] mt-5">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
          </p>
        </div>
      </main>
    </div>
  );
}
