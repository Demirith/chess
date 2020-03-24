import React from 'react';
import Piece from "./Piece";

export default {
  title: 'Piece',
  component: Piece,
};

export const PieceDefault = () => <Piece></Piece>

export const PieceIsWhite = () => <Piece isWhite="true"></Piece>