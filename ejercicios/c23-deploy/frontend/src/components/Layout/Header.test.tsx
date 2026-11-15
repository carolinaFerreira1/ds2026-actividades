import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../context/AuthContext";

describe("Componente Header", () => {
  it("debe renderizar los enlaces públicos y el botón de ingresar cuando no hay usuario", () => {
    (useAuth as any).mockReturnValue({
      usuario: null,
      logout: vi.fn(),
      tieneRol: () => false,
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Mi librería")).toBeTruthy();
    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Catálogo completo")).toBeTruthy();
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeTruthy();
    
    expect(screen.queryByText("Agregar libro nuevo")).toBeNull();
  });

  it("debe mostrar opciones de administrador y el saludo cuando hay sesión de ADMIN", () => {
    (useAuth as any).mockReturnValue({
      usuario: { id: 1, nombre: "Admin Test", rol: "ADMIN" },
      logout: vi.fn(),
      tieneRol: (rol: string) => rol === "ADMIN",
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Hola, Admin Test")).toBeTruthy();
    expect(screen.getByText("Agregar libro nuevo")).toBeTruthy();
    expect(screen.getByRole("button", { name: /salir/i })).toBeTruthy();
  });
});