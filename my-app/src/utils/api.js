export async function registerUser(userData) {
  try {
    const response = await fetch("http://lifestealer86.ru/api-shop/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fio: userData.fio,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (response.status === 400) {
      throw new Error(data.error?.message || "Некорректные данные");
    }

    if (response.status === 409) {
      throw new Error("Пользователь с таким email уже существует");
    }

    if (!response.ok) {
      throw new Error(data.error?.message || "Ошибка сервера");
    }

    return data;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error;
  }
}
export async function loginUser(credentials) {
  const response = await fetch("https://lifestealer86.ru/api-shop/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return await response.json();
}
