"use client";

import { createContext, useContext } from "react";

export const SelectedDateContext = createContext<Date>(new Date());
export const useSelectedDate = () => useContext(SelectedDateContext);
