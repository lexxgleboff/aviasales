import React from 'react'
import './FilterButton.sass'

export default function FilterButton() {
  return (
    <div className="filter-button">
      <button className="filter-button__btn first-btn">Самый дешевый</button>
      <button className="filter-button__btn">Самый быстрый</button>
      <button className="filter-button__btn last-btn">Оптимальный</button>
    </div>
  )
}
