import { SettingsContainer } from '@/components/settings/SettingsContainer';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import React from 'react';

export default function ContactsSettings() {
	return (
		<SettingsContainer>
			<SettingsHeader title="Contacts" description="Manage your contacts in Spacedrive." />
		</SettingsContainer>
	);
}
