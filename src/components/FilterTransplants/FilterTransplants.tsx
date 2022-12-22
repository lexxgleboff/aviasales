import React from 'react'
import './FilterTransplants.sass'

export default function FilterTransplants() {
  return (
    <div className="transplants">
      <span className="transplants__title">количество пересадок</span>
      <label className="transplants__label">
        <input
          type="checkbox"
          id="all"
          name="all"
        />
        <span>Все</span>
      </label>
      <label className="transplants__label">
        <input
          type="checkbox"
          id="non-stop"
          name="non-stop"
        />
        <span>Без пересадок</span>
      </label>
      <label className="transplants__label">
        <input
          type="checkbox"
          id="transplant1"
          name="transplant1"
        />
        <span>1 пересадка</span>
      </label>
      <label className="transplants__label">
        <input
          type="checkbox"
          id="transplant2"
          name="transplant2"
        />
        <span>2 пересадка</span>
      </label>
      <label className="transplants__label">
        <input
          type="checkbox"
          id="transplant3"
          name="transplant3"
        />
        <span>3 пересадки</span>
      </label>
    </div>
  )
}