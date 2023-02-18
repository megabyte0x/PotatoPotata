import Link from 'next/link';

import ConnectButton from './ConnectButton';

import { MENU_LIST } from '~~/constants';

const Navbar = (): JSX.Element => {
  return (
    <>
      <div className="navbar min-h-0 bg-base-100">
        <div className="flex-1">
          <a className="normal-case font-bold font-signika text-primary text-3xl">Potato Potata</a>
        </div>
        <ul className="flex font-signika font-bold text-primary items-center flex-row gap-6">
          {MENU_LIST.map((item) => {
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a className="btn btn-sm btn-ghost normal-case text-base">{item.name}</a>
                </Link>
              </li>
            );
          })}
          <li>
            <ConnectButton />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
