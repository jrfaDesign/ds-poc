import { View, StyleSheet, Image } from 'react-native';
import { useTheme, Typography, Box, Card, Button } from '@repo/ui-react-native';
import type { Sale } from '@/data/mockSales';
import { BrandLogo } from './BrandLogo';

const CAR_IMAGE =
	'https://images.pexels.com/photos/12604817/pexels-photo-12604817.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop';

const FLAG_MAP: Record<string, string> = {
	PT: '\u{1F1F5}\u{1F1F9}',
	ES: '\u{1F1EA}\u{1F1F8}',
	DK: '\u{1F1E9}\u{1F1F0}',
	DE: '\u{1F1E9}\u{1F1EA}',
	FR: '\u{1F1EB}\u{1F1F7}',
	NL: '\u{1F1F3}\u{1F1F1}',
};

const accessConfig: Record<Sale['access'], { label: string; dotColor: string }> = {
	exclusive: { label: 'Exclusive', dotColor: '#F59E0B' },
	public: { label: 'Public', dotColor: '#10B981' },
	membersOnly: { label: 'Members Only', dotColor: '#374151' },
};

const statusConfig: Record<Sale['status'], { label: string; bgColor: string; textColor: string }> =
	{
		live: { label: 'xBid Live', bgColor: '#10B981', textColor: '#FFFFFF' },
		notStarted: { label: 'Not Started', bgColor: '#FFFFFF', textColor: '#1F2937' },
		openAuction: { label: 'Fixed Price', bgColor: '#FFFFFF', textColor: '#1F2937' },
	};

type SaleCardProps = {
	sale: Sale;
};

export function SaleCard({ sale }: SaleCardProps) {
	const { theme } = useTheme();
	const access = accessConfig[sale.access];
	const status = statusConfig[sale.status];

	const cardBorderRadius = theme.contracts.components.cardBorderRadii;

	return (
		<Card
			variant="raised"
			style={{
				borderRadius: cardBorderRadius,
				padding: 0,
				overflow: 'hidden' as const,
				...theme.shadows['sm'],
			}}
		>
			{/* Image */}
			<View style={styles.imageContainer}>
				<Image source={{ uri: CAR_IMAGE }} style={styles.image} resizeMode="cover" />

				{/* Status Badge - top left */}
				<View style={styles.statusBadgeWrapper}>
					<View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
						<Typography
							role="caption"
							weight={500}
							style={{ color: status.textColor, fontSize: 11 }}
						>
							{status.label}
						</Typography>
					</View>
				</View>

				{/* Brand Logo - bottom right */}
				<View style={styles.logoWrapper}>
					<View
						style={[
							styles.logoContainer,
							{ backgroundColor: theme.contracts.components.saleCardLogoBg },
						]}
					>
						<BrandLogo variant="onImage" style={{ height: 14 }} />
					</View>
				</View>
			</View>

			{/* Content */}
			<Box gap="sm" padding="lg">
				{/* Row 1: Flag + Access Badge */}
				<Box flexDirection="row" alignItems="center" gap="xs">
					<Typography role="caption">{FLAG_MAP[sale.countryCode] ?? '\u{1F3F3}\uFE0F'}</Typography>
					<Box flexDirection="row" alignItems="center" gap="xxs">
						<View style={[styles.dot, { backgroundColor: access.dotColor }]} />
						<Typography role="caption" color="text-secondary">
							{access.label}
						</Typography>
					</Box>
				</Box>

				{/* Row 2: Title */}
				<Typography role="h4" color="text-primary" weight={700}>
					{sale.title}
				</Typography>

				{/* Row 3: Description */}
				<Typography role="caption" color="text-tertiary">
					{sale.description}
				</Typography>

				{/* Row 4: Link */}
				<Button variant="link" size="sm">
					See full description
				</Button>

				{/* Divider */}
				<View style={[styles.divider, { backgroundColor: theme.colorTokens['border-primary'] }]} />

				{/* Row 5: Starts / Ends */}
				<Box flexDirection="row" gap="md">
					<Typography role="caption" color="text-tertiary">
						{sale.startsAtLabel.split(': ')[0]}:{' '}
						<Typography role="caption" color="text-primary" weight={500}>
							{sale.startsAtLabel.split(': ').slice(1).join(': ')}
						</Typography>
					</Typography>
					<Typography role="caption" color="text-tertiary">
						{sale.endsAtLabel.split(': ')[0]}:{' '}
						<Typography role="caption" color="text-primary" weight={500}>
							{sale.endsAtLabel.split(': ').slice(1).join(': ')}
						</Typography>
					</Typography>
				</Box>

				{/* Divider */}
				<View style={[styles.divider, { backgroundColor: theme.colorTokens['border-primary'] }]} />

				{/* Row 6: Location + Lots */}
				<Box flexDirection="row" flexWrap="wrap" gap="xs">
					<View style={[styles.chip, { backgroundColor: theme.colorTokens['bg-tertiary'] }]}>
						<Typography role="caption" weight={700} color="text-primary">
							{sale.location}
						</Typography>
					</View>
					<View style={[styles.chip, { backgroundColor: theme.colorTokens['bg-tertiary'] }]}>
						<Typography role="caption" weight={700} color="text-primary">
							{sale.lotsCount} Lots
						</Typography>
					</View>
				</Box>
			</Box>
		</Card>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		position: 'relative',
		aspectRatio: 16 / 10,
		width: '100%',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	statusBadgeWrapper: {
		position: 'absolute',
		top: 12,
		left: 12,
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 4,
	},
	logoWrapper: {
		position: 'absolute',
		bottom: 12,
		right: 12,
	},
	logoContainer: {
		backgroundColor: 'white',
		borderRadius: 4,
		paddingVertical: 3,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	divider: {
		height: 1,
		width: '100%',
	},
	chip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
	},
});
