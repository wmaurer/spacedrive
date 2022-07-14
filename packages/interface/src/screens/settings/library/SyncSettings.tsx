import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function SyncSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Sync" description="Manage how Spacedrive syncs." />
		</SettingsContainer>
	);
}
