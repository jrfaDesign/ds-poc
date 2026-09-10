import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopNavBar, Select, Toggle, Typography, Box } from '@repo/ui-web-tailwind';
import { useTheme } from '../hooks/useTheme';
import type { ThemeKey } from '../hooks/useTheme';
import { FiHelpCircle, FiGlobe, FiSettings, FiHeart } from 'react-icons/fi';

import DefaultLogo from '../../public/themeBrands/default.svg';
import BYDLogo from '../../public/themeBrands/byd.svg';

const LogoMap: Partial<Record<ThemeKey, string>> = {
	default: DefaultLogo,
	byd: BYDLogo,
	byd_premium: BYDLogo,
};

export function AppHeader() {
	const { themeKey, setTheme, darkMode, toggleDark } = useTheme();
	const navigate = useNavigate();
	const location = useLocation();
	const Logo = LogoMap[themeKey] ?? DefaultLogo;

	const isMvp = location.pathname === '/public-sales';

	const navItems = [
		{ id: 'search', label: 'Vehicle search' },
		{
			id: 'sales',
			label: 'Sales',
			badge: { label: 'Live', toneToken: 'bg-success-solid' as const, dot: true },
		},
		{ id: 'dashboard', label: 'Dashboard' },
		{ id: 'support', label: 'Support', icon: <FiHelpCircle size={16} /> },
	];

	const activeNavId = isMvp ? 'sales' : 'search';

	const handleNavClick = useCallback(
		(id: string) => {
			if (id === 'sales') {
				navigate('/public-sales');
			} else {
				navigate('/');
			}
		},
		[navigate]
	);

	const actions = (
		<div className="flex items-center gap-2xl">
			<button className="flex items-center gap-xxs text-utility-neutral-300 hover:text-white cursor-pointer">
				<FiGlobe size={18} />
				<span className="text-sm font-medium">PT</span>
			</button>
			<button className="text-utility-neutral-300 hover:text-white cursor-pointer">
				<FiSettings size={18} />
			</button>
			<button className="text-utility-neutral-300 hover:text-white cursor-pointer">
				<FiHeart size={18} />
			</button>
		</div>
	);

	const profileMenu = (
		<div className="flex flex-col py-lg gap-xl px-lg">
			<div className="px-sm py-xxs border-b border-surface-base-border">
				<Typography role="label" color="text-primary">
					BM
				</Typography>
			</div>
			<div className="px-sm py-xxs">
				<Typography role="caption" color="text-secondary" className="mb-xxs block">
					Theme
				</Typography>
				<Select
					value={themeKey}
					onChange={(e) => setTheme(e.target.value as ThemeKey)}
					id="header-theme-select"
				>
					<Select.Item value="default">Default</Select.Item>
					<Select.Item value="cag">CAG</Select.Item>
					<Select.Item value="bca">BCA</Select.Item>
					<Select.Item value="byd">BYD</Select.Item>
					<Select.Item value="byd_premium">BYD Premium</Select.Item>
					<Select.Item value="caos">CAOS</Select.Item>
				</Select>
			</div>
			<div className="px-sm py-xxs flex items-center justify-between">
				<Typography role="caption" color="text-secondary">
					Dark Mode
				</Typography>
				<Toggle checked={darkMode} onChange={toggleDark} />
			</div>
			<div className="border-t border-surface-base-border px-sm py-xxs">
				<button
					onClick={() => navigate('/')}
					className="text-sm text-action-link-on hover:text-action-link-on-hover cursor-pointer"
				>
					DS Showcase
				</button>
			</div>
		</div>
	);

	return (
		<TopNavBar
			logo={
				<img src={Logo} alt="Logo" className="h-6 cursor-pointer" onClick={() => navigate('/')} />
			}
			items={navItems}
			activeItemId={activeNavId}
			onItemClick={handleNavClick}
			searchPlaceholder="Search vehicles or sales"
			onSearchChange={() => {}}
			actions={actions}
			profileButton="BM"
			profileMenu={profileMenu}
		/>
	);
}
