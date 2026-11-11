import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopNavBar, Toggle, Typography, useTheme } from '@repo/ui-web-tailwind';
import { FiHelpCircle, FiGlobe, FiSettings, FiHeart } from 'react-icons/fi';
import { BrandLogo } from '../../../components/BrandLogo';
import { ThemeConfigPanel } from '../../../components/ThemeConfigPanel';

export function AppHeader() {
	const { darkMode, toggleDark } = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

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
			<ThemeConfigPanel />
			<div className="px-sm py-xxs flex items-center justify-between">
				<Typography role="caption" color="text-secondary">
					Dark Mode
				</Typography>
				<Toggle isSelected={darkMode} onChange={toggleDark} />
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
			logo={<BrandLogo className="h-6 cursor-pointer" onClick={() => navigate('/')} />}
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
