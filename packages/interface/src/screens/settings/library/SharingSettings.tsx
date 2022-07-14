import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function SharingSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Sharing" description="Manage who has access to your libraries." />
		</SettingsContainer>
	);
}
