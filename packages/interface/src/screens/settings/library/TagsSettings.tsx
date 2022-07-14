import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function TagsSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Tags" description="Manage your tags." />
		</SettingsContainer>
	);
}
