# PR Proposal: Phoenixd Documentation Integration and Translation Cleanup

## Description
This PR integrates a complete documentation section for `phoenixd`, updates site navigation, and performs a deep cleanup of English translations.

### Main Changes

#### 1. New Phoenixd Documentation
A new section has been added under `docs/Phoenixd/` (and its English translation) which includes:
- **Automated Installation:** Guide for using the quick installation script.
- **Manual Installation:** Detailed instructions for manual configuration and creating systemd services.
- **Configuration:** Full reference for flags and `phoenix.conf` options.
- **API Reference:** Exhaustive documentation of API v0.7.2 endpoints.
- **Uninstallation:** Safe guide to remove software without compromising private keys.

#### 2. UI and Navigation Improvements
- **Docusaurus Config:** Added a new sidebar and menu item for "Phoenix".
- **Navbar:** Renamed "REST-API" to "API" for cleaner navigation.
- **Footer:** Added direct links to the new documentation.

#### 3. Maintenance and i18n
- **Translation Cleanup:** Removed 50+ obsolete translation keys in `i18n/en/code.json`.
- **Utility Script:** Included `find_unused_translations.sh` to facilitate the identification of unused translation keys in the future.
- **Version:** Updated the homepage hero text to `v0.5.1`.

#### 4. Development Update
- Updated `Setup.md` so the `phoenixd` installation script points to the official `ambrosia-dev` repository.

## Change Type
- [x] New feature (documentation and scripts)
- [x] Improvement of existing documentation
- [x] Refactoring / Cleanup (i18n)
