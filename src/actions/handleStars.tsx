'use client'

import Image from "next/image"
import small_0 from "../../public/images/icons/small_0.png"
import small_1 from "../../public/images/icons/small_1.png"
import small_1_half from "../../public/images/icons/small_1_half.png"
import small_2 from "../../public/images/icons/small_2.png"
import small_2_half from "../../public/images/icons/small_2_half.png"
import small_3 from "../../public/images/icons/small_3.png"
import small_3_half from "../../public/images/icons/small_3_half.png"
import small_4 from "../../public/images/icons/small_4.png"
import small_4_half from "../../public/images/icons/small_4_half.png"
import small_5 from "../../public/images/icons/small_5.png"

export const handleStars = (rating: number) => {
    if (rating === 0) {
        return <Image src={small_0} alt="Stars 0" />
    } else if (rating === 1) {
        return <Image src={small_1} alt="Stars 1" />
    } else if (rating > 1 && rating < 2) {
        return <Image src={small_1_half} alt="Stars 1.5" />
    } else if (rating === 2) {
        return <Image src={small_2} alt="Stars 2" />
    } else if (rating > 2 && rating < 3) {
        return <Image src={small_2_half} alt="Stars 2.5" />
    } else if (rating === 3) {
        return <Image src={small_3} alt="Stars 3" />
    } else if (rating > 3 && rating < 4) {
        return <Image src={small_3_half} alt="Stars 3.5 " />
    } else if (rating === 4) {
        return <Image src={small_4} alt="Stars 4" />
    } else if (rating > 4 && rating < 5) {
        return <Image src={small_4_half} alt="Stars 4.5" />
    } else {
        return <Image src={small_5} alt="Stars 5" />
    }
}