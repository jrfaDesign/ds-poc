import { useState, useRef, useEffect, useCallback } from 'react';
import type { TopNavBarProps } from './TopNavBar.types';
import { Container } from '../Container/Container';
import { Input } from '../Input/Input';
import { Tag } from '../Tag/Tag';
import { Box } from '../Box/Box';
import { Badge } from '../Badge/Badge';
import { PageSection } from '../PageSection/PageSection';
import { Card } from '../Card/Card';

const FOCUS_RING =
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-brand-tertiary-alt';

const HEADER_MODE = 'light';

const SEARCH_HEADER_MODE = HEADER_MODE === 'light' ? 'dark' : 'light';

export function TopNavBar({
	logo,
	items,
	activeItemId,
	onItemClick,
	searchPlaceholder,
	onSearchChange,
	actions,
	profileButton,
	profileMenu,
	className,
	style,
}: TopNavBarProps) {
	const [searchValue, setSearchValue] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// NEW: refs for active tab underline
	const activeTabRef = useRef<HTMLButtonElement | null>(null);
	const [underlineStyle, setUnderlineStyle] = useState<{ width: number; left: number }>({
		width: 0,
		left: 0,
	});

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchValue(e.target.value);
			onSearchChange(e.target.value);
		},
		[onSearchChange]
	);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		if (menuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [menuOpen]);

	// NEW: measure active tab width + position relative to nav
	useEffect(() => {
		if (activeTabRef.current) {
			const rect = activeTabRef.current.getBoundingClientRect();
			const navRect = activeTabRef.current.closest('nav')!.getBoundingClientRect();

			setUnderlineStyle({
				width: rect.width,
				left: rect.left - navRect.left,
			});
		}
	}, [activeItemId, items]);

	return (
		<nav
			className={['w-full sticky top-0 z-50 shadow-sm relative', 'bg-components-header', className]
				.filter(Boolean)
				.join(' ')}
			style={style}
		>
			<PageSection mode={HEADER_MODE}>
				<Container
					as="div"
					className="flex items-center gap-5xl py-md min-h-18 px-0  "
					style={{ padding: 0 }}
				>
					{/* Logo */}
					<div className="shrink-0">{logo}</div>

					{/* Nav Items */}
					<div className="hidden md:flex items-center gap-xs flex-1 relative">
						{items.map((item) => {
							const isActive = item.id === activeItemId;

							return (
								<button
									key={item.id}
									ref={isActive ? activeTabRef : null}
									onClick={() => onItemClick(item.id)}
									className={[
										'inline-flex items-center gap-xxs px-sm py-xxs text-sm cursor-pointer transition-colors shrink-0',
										FOCUS_RING,
										isActive
											? 'font-bold text-white'
											: 'font-medium text-utility-neutral-300 hover:text-white',
									]
										.filter(Boolean)
										.join(' ')}
								>
									{item.icon && <span className="flex items-center">{item.icon}</span>}
									{item.label}
									{item.badge && (
										<>
											<Badge variant="success" label="Live" size="sm" />
										</>
									)}
								</button>
							);
						})}
					</div>

					{/* Search + Actions + Profile */}
					<div className="flex items-center gap-2xl ml-auto">
						{/* Search Input */}
						<Box
							invert
							className="hidden sm:flex items-center"
							mode={SEARCH_HEADER_MODE}
							background="bg-brand-solid"
						>
							<Input
								placeholder={searchPlaceholder}
								size="md"
								value={searchValue}
								onChange={handleSearchChange}
								style={{ borderRadius: '9999px', border: 'none' }}
							/>
						</Box>

						{/* Actions */}
						{actions && <div className="flex items-center gap-xs">{actions}</div>}

						{/* Profile Menu */}
						{profileMenu && (
							<div className="relative" ref={menuRef}>
								<button
									onClick={() => setMenuOpen(!menuOpen)}
									className="flex items-center justify-center w-10 h-10 rounded-full bg-components-header-avatar text-action-primary-on font-bold text-sm cursor-pointer"
								>
									{profileButton || 'TU'}
								</button>
								{menuOpen && (
									<Card
										padding="xxs"
										className={[
											'absolute right-0 top-full mt-xxs z-50 ds-unforce',
											' min-w-2xs',
										].join(' ')}
										variant="surface"
									>
										{profileMenu}
									</Card>
								)}
							</div>
						)}
					</div>
				</Container>
				{/* Active indicator at bottom of header */}
				<div
					className="hidden md:flex absolute bottom-0 left-0 h-1 bg-action-primary-bg transition-all duration-200"
					style={{
						width: underlineStyle.width,
						left: underlineStyle.left,
					}}
				/>
			</PageSection>
		</nav>
	);
}
