import React from "react"
import { Icon, makeStyles } from "@material-ui/core"

const useMenuBtnStyles = makeStyles((theme) => ({
    a: {
        fill: "#fff",
    },
    size: {
        width: 77,
        height: 50.5,
    },
}))

const MenuBtn = () => {
    const classes = useMenuBtnStyles()
    return (
        <Icon className={classes.size}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 50.5">
                <defs>
                    <filter id="background_option" x="3" y="0" width="70.5" height="50.5" filterUnits="userSpaceOnUse">
                        <feOffset dx="3" dy="3" />
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feFlood flood-opacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                    <filter id="shadows" x="16" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="3" dy="3" />
                        <feGaussianBlur stdDeviation="6" result="blur-2" />
                        <feFlood flood-opacity="0.58" />
                        <feComposite operator="in" in2="blur-2" />
                    </filter>
                    <filter id="shadows-2" x="16" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="2.3" dy="2.3" />
                        <feGaussianBlur stdDeviation="1" result="blur-3" />
                        <feFlood flood-opacity="0.161" result="color" />
                        <feComposite operator="out" in="SourceGraphic" in2="blur-3" />
                        <feComposite operator="in" in="color" />
                        <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                    <filter id="shadows-3" x="0" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="3" dy="3" />
                        <feGaussianBlur stdDeviation="6" result="blur-4" />
                        <feFlood flood-opacity="0.58" />
                        <feComposite operator="in" in2="blur-4" />
                    </filter>
                    <filter id="shadows-4" x="0" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="2.3" dy="2.3" />
                        <feGaussianBlur stdDeviation="1" result="blur-5" />
                        <feFlood flood-opacity="0.161" result="color-2" />
                        <feComposite operator="out" in="SourceGraphic" in2="blur-5" />
                        <feComposite operator="in" in="color-2" />
                        <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                    <filter id="shadows-5" x="32" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="3" dy="3" />
                        <feGaussianBlur stdDeviation="6" result="blur-6" />
                        <feFlood flood-opacity="0.58" />
                        <feComposite operator="in" in2="blur-6" />
                    </filter>
                    <filter id="shadows-6" x="32" y="3" width="45" height="45" filterUnits="userSpaceOnUse">
                        <feOffset dx="2.3" dy="2.3" />
                        <feGaussianBlur stdDeviation="1" result="blur-7" />
                        <feFlood flood-opacity="0.161" result="color-3" />
                        <feComposite operator="out" in="SourceGraphic" in2="blur-7" />
                        <feComposite operator="in" in="color-3" />
                        <feComposite operator="in" in2="SourceGraphic" />
                    </filter>
                </defs>
                <g id="option_overlay" data-name="option overlay" transform="translate(384.501 -641.347) rotate(90)">
                    <g transform="matrix(0, -1, 1, 0, 641.35, 384.5)" filter="url(#background_option)">
                        <g
                            id="background_option-2"
                            data-name="background option"
                            transform="translate(69) rotate(90)"
                            fill="#fff"
                            stroke="#c5b9b9"
                            stroke-width="0.1">
                            <rect width="46" height="66" rx="18" stroke="none" />
                            <rect x="0.05" y="0.05" width="45.9" height="65.9" rx="17.95" fill="none" />
                        </g>
                    </g>
                    <g id="dots" transform="translate(659.673 328.251)">
                        <g id="dot_mid" data-name="dot mid" transform="translate(-0.327 16.251)">
                            <g id="bg" fill="rgba(59,59,59,0.1)" stroke="#c5b9b9" stroke-width="0.1">
                                <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                            </g>
                            <g data-type="innerShadowGroup">
                                <g transform="matrix(0, -1, 1, 0, -18, 40)" filter="url(#shadows)">
                                    <g
                                        id="shadows-7"
                                        data-name="shadows"
                                        transform="translate(40 18) rotate(90)"
                                        fill="none"
                                        stroke="#c5b9b9"
                                        stroke-width="0.1">
                                        <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                        <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                    </g>
                                </g>
                                <g transform="matrix(0, -1, 1, 0, -18, 40)" filter="url(#shadows-2)">
                                    <circle
                                        id="shadows-8"
                                        data-name="shadows"
                                        cx="4.5"
                                        cy="4.5"
                                        r="4.5"
                                        transform="translate(40 18) rotate(90)"
                                        fill="#fff"
                                    />
                                </g>
                                <g id="shadows-9" data-name="shadows" fill="none" stroke="#c5b9b9" stroke-width="0.1">
                                    <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                    <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                </g>
                            </g>
                        </g>
                        <g id="dot_bottom" data-name="dot bottom" transform="translate(-0.327 32.251)">
                            <g id="bg-2" data-name="bg" fill="rgba(59,59,59,0.1)" stroke="#c5b9b9" stroke-width="0.1">
                                <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                            </g>
                            <g data-type="innerShadowGroup">
                                <g transform="matrix(0, -1, 1, 0, -18, 24)" filter="url(#shadows-3)">
                                    <g
                                        id="shadows-10"
                                        data-name="shadows"
                                        transform="translate(24 18) rotate(90)"
                                        fill="none"
                                        stroke="#c5b9b9"
                                        stroke-width="0.1">
                                        <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                        <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                    </g>
                                </g>
                                <g transform="matrix(0, -1, 1, 0, -18, 24)" filter="url(#shadows-4)">
                                    <circle
                                        id="shadows-11"
                                        data-name="shadows"
                                        cx="4.5"
                                        cy="4.5"
                                        r="4.5"
                                        transform="translate(24 18) rotate(90)"
                                        fill="#fff"
                                    />
                                </g>
                                <g id="shadows-12" data-name="shadows" fill="none" stroke="#c5b9b9" stroke-width="0.1">
                                    <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                    <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                </g>
                            </g>
                        </g>
                        <g id="dot_top" data-name="dot top" transform="translate(-0.327 0.251)">
                            <g id="bg-3" data-name="bg" fill="rgba(59,59,59,0.1)" stroke="#c5b9b9" stroke-width="0.1">
                                <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                            </g>
                            <g data-type="innerShadowGroup">
                                <g transform="matrix(0, -1, 1, 0, -18, 56)" filter="url(#shadows-5)">
                                    <g
                                        id="shadows-13"
                                        data-name="shadows"
                                        transform="translate(56 18) rotate(90)"
                                        fill="none"
                                        stroke="#c5b9b9"
                                        stroke-width="0.1">
                                        <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                        <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                    </g>
                                </g>
                                <g transform="matrix(0, -1, 1, 0, -18, 56)" filter="url(#shadows-6)">
                                    <circle
                                        id="shadows-14"
                                        data-name="shadows"
                                        cx="4.5"
                                        cy="4.5"
                                        r="4.5"
                                        transform="translate(56 18) rotate(90)"
                                        fill="#fff"
                                    />
                                </g>
                                <g id="shadows-15" data-name="shadows" fill="none" stroke="#c5b9b9" stroke-width="0.1">
                                    <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
                                    <circle cx="4.5" cy="4.5" r="4.45" fill="none" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </Icon>
    )
}
export default MenuBtn
