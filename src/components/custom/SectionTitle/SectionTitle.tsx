import React from 'react'

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <h3 className="font-bold text-3xl text-center font-[Candal] my-4">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8"></div>
        </div>
    )
}

export default SectionTitle