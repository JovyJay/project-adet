import React from 'react';
import { Slot } from 'expo-router';
import { ListingsProvider } from './ListingsContext';

export default function RootLayout() {
  return (
    <ListingsProvider>
      <Slot />
    </ListingsProvider>
  );
}