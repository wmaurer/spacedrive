import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function KeysSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Keys" description="Manage your keys." />
		</SettingsContainer>
	);
}
