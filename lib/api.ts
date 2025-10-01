export async function getTariffs() {
   const res = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
   if (!res.ok) {
      throw new Error("Ошибка загрузки тарифов");
   }
   return res.json();
}
