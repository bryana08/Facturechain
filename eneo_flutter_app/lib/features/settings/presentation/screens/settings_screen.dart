import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:facturechain/core/theme/app_colors.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) return;
        context.go('/');
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Paramètres',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          leading: IconButton(
            icon: const Icon(LucideIcons.chevronLeft, color: AppColors.primary),
            onPressed: () => context.go('/'),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            _buildProfileCard(),
            const SizedBox(height: 24),
            _buildSectionTitle('Compte'),
            _buildSettingTile(
              icon: LucideIcons.user,
              title: 'Informations client',
              subtitle: 'Demo Client - FC-2048',
            ),
            _buildSettingTile(
              icon: LucideIcons.bell,
              title: 'Notifications',
              subtitle: 'Alertes facture, compteur et litiges',
              trailing: Switch(
                value: true,
                activeThumbColor: AppColors.primary,
                onChanged: (_) {},
              ),
            ),
            const SizedBox(height: 16),
            _buildSectionTitle('Facturation'),
            _buildSettingTile(
              icon: LucideIcons.creditCard,
              title: 'Méthode de paiement',
              subtitle: 'Mobile Money connecté',
            ),
            _buildSettingTile(
              icon: LucideIcons.fileText,
              title: 'Reçus et historiques',
              subtitle: 'Télécharger vos justificatifs',
            ),
            const SizedBox(height: 16),
            _buildSectionTitle('Sécurité'),
            _buildSettingTile(
              icon: LucideIcons.shieldCheck,
              title: 'Vérification blockchain',
              subtitle: 'Contrôle activé pour chaque facture',
            ),
            _buildSettingTile(
              icon: LucideIcons.logOut,
              title: 'Déconnexion',
              subtitle: 'Retourner à l’écran de connexion',
              onTap: () => context.go('/login'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Row(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundColor: Colors.white,
            child: Icon(LucideIcons.user, color: AppColors.primary),
          ),
          SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Demo Client',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  'demo@facturechain.com',
                  style: TextStyle(color: Colors.white70),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(
          color: AppColors.textPrimary,
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildSettingTile({
    required IconData icon,
    required String title,
    required String subtitle,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderColor),
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppColors.primaryUltraLight,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        title: Text(
          title,
          style: const TextStyle(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.w700,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
        ),
        trailing: trailing ?? const Icon(LucideIcons.chevronRight, size: 18),
      ),
    );
  }
}
