import { Container, Typography, Button, PageSection, Box } from '@repo/ui-web-tailwind';
import { useTheme, type ThemeKey } from '../hooks/useTheme';

import DefaultLogo from '../../public/themeBrands/default.svg';
import BYDLogo from '../../public/themeBrands/byd.svg';
import { useNavigate } from 'react-router-dom';

const footerSections = [
	{
		title: 'About BYD',
		links: [
			{ label: 'About Us', href: '#' },
			{ label: 'Careers', href: '#' },
			{ label: 'News', href: '#' },
			{ label: 'BYD Global', href: '#' },
		],
	},
	{
		title: 'Useful links',
		links: [
			{ label: 'Buy With Us', href: '#' },
			{ label: 'Sell With Us', href: '#' },
			{ label: 'Services', href: '#' },
			{ label: 'Locations', href: '#' },
		],
	},
	{
		title: 'Ownership',
		links: [
			{ label: 'Service Maintenance', href: '#' },
			{ label: 'BYD Assistance', href: '#' },
			{ label: 'How BYD Protects Your Privacy and Data', href: '#' },
		],
	},
	{
		title: 'Help',
		links: [
			{ label: 'Contact Us', href: '#' },
			{ label: 'Customer Claims', href: '#' },
			{ label: 'FAQs', href: '#' },
			{ label: 'Glossary of Terms', href: '#' },
		],
	},
];

function FacebookIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function BackToTopIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 15l-6-6-6 6" />
		</svg>
	);
}

const LogoMap: Partial<Record<ThemeKey, string>> = {
	default: DefaultLogo,
	byd: BYDLogo,
	byd_premium: BYDLogo,
};

export function AppFooter() {
	const { themeKey } = useTheme();
	const navigate = useNavigate();

	const Logo = LogoMap[themeKey] ?? DefaultLogo;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<PageSection key={themeKey} className="bg-components-footer py-8 " padding="none" mode="dark">
			{/* Back to Top */}

			<Box display="flex" flexDirection="column" gap="2xl">
				<Container>
					<div className="flex justify-center py-lg">
						<Button variant="tertiary" className="gap-sm" onClick={scrollToTop}>
							<BackToTopIcon />
							Back to top
						</Button>
					</div>
				</Container>

				<Box
					display="flex"
					flexDirection="column"
					gap="7xl"
					paddingTop="6xl"
					paddingBottom="4xl"
					borderRadius="4xl"
					className="bg-components-footer-secondary rounded-6xl  "
					style={{ padding: '4rem' }}
				>
					{/* Footer Links */}
					<Container>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
							{footerSections.map((section) => (
								<div key={section.title}>
									<Typography role="label" color="text-white" className="mb-sm block">
										{section.title}
									</Typography>
									<ul className="flex flex-col gap-xs">
										{section.links.map((link) => (
											<li key={link.label}>
												<a
													href={link.href}
													className="text-sm text-neutral-300 hover:text-white transition-colors"
												>
													{link.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</Container>

					{/* Legal Card */}
					<Container>
						<div className="mb-lg rounded-[36px] ">
							<div className="flex flex-col sm:flex-row items-center justify-between gap-md">
								<div className="flex flex-col items-start gap-xl ">
									<img
										src={Logo}
										alt="Logo"
										className="h-10 cursor-pointer"
										onClick={() => navigate('/')}
									/>
									<Typography role="caption" color="text-tertiary">
										© 2027 BYD Auto. All rights reserved.
									</Typography>
								</div>
								<div className="flex items-center gap-sm">
									<a
										href="#"
										className="text-neutral-300 hover:text-white transition-colors"
										aria-label="Facebook"
									>
										<FacebookIcon />
									</a>
									<a
										href="#"
										className="text-neutral-300 hover:text-white transition-colors"
										aria-label="LinkedIn"
									>
										<LinkedInIcon />
									</a>
								</div>
							</div>
						</div>
					</Container>
				</Box>
			</Box>
		</PageSection>
	);
}
