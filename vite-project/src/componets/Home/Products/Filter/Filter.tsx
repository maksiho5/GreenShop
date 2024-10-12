import React, { useState, useRef } from 'react'
import "./Filter.css"
function Filter({setCategories, filter, closeFilter}) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const selectedElement = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element
        const elementId = target.closest(".blosk_filter")?.getAttribute("data-id") || null

        setActiveId(elementId);
        setCategories(elementId)
if (elementId == "0") {
    setCategories(undefined)
    
}
    }
    // console.log(activeId);
    
    return (
        <div className="filter" ref={filter}>
            <div className="closeMenu" onClick={closeFilter}>✕</div>
            <h4 className="title">Категории</h4>
            <div className="filter_container">

            <div
                    className={`blosk_filter ${activeId == "0" ? 'active' : ''}`}
                    data-id="0"
                    onClick={selectedElement}
                >
                    <p className='text'>Все растения</p>
                    <p className='number'></p>
                </div>

                <div
                    className={`blosk_filter ${activeId == "1" ? 'active' : ''}`}
                    data-id="1"
                    onClick={selectedElement}
                >
                    <p className='text'>Комнатные растения</p>
                    <p className='number'>(2)</p>
                </div>
                <div
                    className={`blosk_filter ${activeId === '2' ? 'active' : ''}`}
                    data-id="2"
                    onClick={selectedElement}
                >
                    <p className='text'>Горшочные растения</p>
                    <p className='number'>(2)</p>
                </div>
                <div
                    className={`blosk_filter ${activeId === '3' ? 'active' : ''}`}
                    data-id="3"
                    onClick={selectedElement}
                >
                    <p className='text'>Семена</p>
                    <p className='number'>(2)</p>
                </div>
            </div>
            {/* <h4 className="title">Размер</h4>
            <div className="filter_container">
                <div className="blosk_filter">
                    <p className='text'>Комнатные растения</p>
                    <p className='number'>(33)</p>
                </div>
                <div className="blosk_filter">
                    <p className='text'>Горшечные растения</p>
                    <p className='number'>(20)</p>
                </div>
                <div className="blosk_filter">
                    <p className='text'>Семена</p>
                    <p className='number'>(10)</p>
                </div>
            </div> */}
            <img src="public/home_bamboo.svg" alt="" />
        </div>
    );
}

export default Filter