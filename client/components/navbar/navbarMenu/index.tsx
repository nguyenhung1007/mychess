import * as React from 'react';
import Link from 'next/link';

import config from './config';

export interface NavbarMenuProps {}

const NavbarMenu: React.FunctionComponent<NavbarMenuProps> = () => (
    <ul className=" hidden space-x-3.5 md:flex">
        {config.map((item) => (
            <li key={item.label}>
                <Link href={item.link}>
                    <a href={item.link} className="text-cloud hover:text-cloud-50 duration-300">
                        {item.label}
                    </a>
                </Link>
            </li>
        ))}
    </ul>
);

export default NavbarMenu;
