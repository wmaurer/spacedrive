import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function AppearanceSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Appearance" description="Change the look of your client." />
		</SettingsContainer>
	);
}
