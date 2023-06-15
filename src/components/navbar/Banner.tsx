const Banner = () => {
    return (
        <div className="w-full flex items-center justify-between flex-wrap py-3 h-auto text-sm text-gray-300">
            <p className="text-xs md:text-sm font-light">Free shipping over $100 & Free returns</p>
            <div className="flex items-center gap-5">
                <span className="text-xs md:text-sm font-light">
                    Contact: (123) 4567-8910
                </span>
                <div className="hidden md:flex items-center gap-5">

                    <div className="w-[1px] h-5 bg-gray-600" />
                    <span>English</span>
                    <div className="w-[1px] h-5 bg-gray-600" />
                    <i>USD$</i>
                </div>
            </div>
        </div>
    )
}

export default Banner