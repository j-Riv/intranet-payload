'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Header as HeaderType } from '../../../../payload/payload-types';
import { useAuth } from '../../../_providers/Auth';
import { CMSLink } from '../../Link';

import classes from './index.module.scss';

const absenceRequestLinks = [
  {
    href: '/absence-requests',
    label: 'Approved',
  },
  {
    href: '/absence-requests/pending',
    label: 'Pending',
  },
];

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const pathname = usePathname();
  const ref = useRef(null);
  useClickAway(ref, () => setUserMenuOpen(false));

  const navItems = header?.navItems || [];
  const { user } = useAuth();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={[
        classes.nav,
        // fade the nav in on user load to avoid flash of content and layout shift
        // Vercel also does this in their own website header, see https://vercel.com
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        // @ts-expect-error
        return <CMSLink key={i} {...link} appearance="none" />;
      })}

      {/* {user && <Link href="/absence-requests">Absence Requests</Link>} */}
      {user && user.isManager && (
        <span className={classes.navItem}>
          <button type="button" className={classes.button} onClick={() => setUserMenuOpen(v => !v)}>
            Absence Requests
          </button>
          {userMenuOpen && (
            <ul ref={ref}>
              {absenceRequestLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          )}
        </span>
      )}
      {user && <Link href="/account">Account</Link>}

      {/* // Uncomment this code if you want to add a login link to the header */}
      {!user && (
        <React.Fragment>
          <Link href="/login">Login</Link>
          {/* <Link href="/create-account">Create Account</Link> */}
        </React.Fragment>
      )}
    </nav>
  );
};
