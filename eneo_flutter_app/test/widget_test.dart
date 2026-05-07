import 'package:facturechain/main.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  setUpAll(() {
    GoogleFonts.config.allowRuntimeFetching = false;
  });

  testWidgets('FactureChain opens on the login screen', (tester) async {
    await tester.pumpWidget(const FactureChainApp());
    await tester.pumpAndSettle();

    expect(find.text('FactureChain'), findsOneWidget);
    expect(find.text('Bienvenue'), findsOneWidget);
    expect(find.text('Se Connecter'), findsOneWidget);
  });
}
