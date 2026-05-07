import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:facturechain/core/theme/app_colors.dart';
import 'package:go_router/go_router.dart';

class DisputeScreen extends StatelessWidget {
  const DisputeScreen({super.key});

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
            'Signaler un Problème',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          leading: IconButton(
            icon: const Icon(LucideIcons.chevronLeft, color: AppColors.primary),
            onPressed: () {
              if (context.canPop()) {
                context.pop();
              } else {
                context.go('/');
              }
            },
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Avez-vous remarqué une anomalie ?',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Utilisez ce formulaire pour signaler tout écart entre votre consommation réelle et celle enregistrée.',
                style: TextStyle(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 32),
              _buildDropdownField('Sélectionner le Compteur', ['Salon', 'Cuisine']),
              const SizedBox(height: 20),
              _buildDropdownField('Type d\'Anomalie', [
                'Surfacturation',
                'Panne de Compteur',
                'Écart Blockchain',
                'Autre'
              ]),
              const SizedBox(height: 20),
              _buildTextField('Description du problème', maxLines: 4),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Signalement envoyé avec succès !'),
                        backgroundColor: AppColors.success,
                      ),
                    );
                  },
                  child: const Text('Soumettre le Signalement'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDropdownField(String label, List<String> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 14,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          decoration: const InputDecoration(
            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
          items: items.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
          onChanged: (val) {},
          hint: const Text('Choisir...', style: TextStyle(color: AppColors.textMuted)),
        ),
      ],
    );
  }

  Widget _buildTextField(String label, {int maxLines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 14,
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          maxLines: maxLines,
          decoration: const InputDecoration(
            hintText: 'Expliquez ici...',
            contentPadding: EdgeInsets.all(16),
          ),
        ),
      ],
    );
  }
}
