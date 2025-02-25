/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import detectLanguage from './detect-language.mjs';

export async function askI18n() {
  if (!this.askForMoreLanguages) return;
  const nativeLanguage = this.jhipsterConfig.nativeLanguage;
  const answers = await this.prompt(
    [
      {
        type: 'confirm',
        name: 'enableTranslation',
        message: 'Would you like to enable internationalization support?',
        default: true,
      },
      {
        type: 'list',
        name: 'nativeLanguage',
        message: 'Please choose the native language of the application',
        choices: () => this.getAllSupportedLanguageOptions(),
        default: () => (this.options.reproducible ? 'en' : detectLanguage()),
        store: true,
      },
    ],
    this.config
  );
  if (nativeLanguage !== answers.nativeLanguage) {
    this.languagesToApply.push(answers.nativeLanguage);
  }
}

export async function askForLanguages() {
  if (!this.askForMoreLanguages) {
    return;
  }
  const answers = await this.prompt([
    {
      type: 'checkbox',
      name: 'languages',
      message: 'Please choose additional languages to install',
      choices: () => {
        const languageOptions = this.getAllSupportedLanguageOptions();
        const nativeLanguage = this.jhipsterConfig.nativeLanguage;
        const currentLanguages = this.jhipsterConfig.languages || [];
        return languageOptions.filter(l => l.value !== nativeLanguage && !currentLanguages.includes(l.value));
      },
    },
  ]);
  if (answers.languages && answers.languages.length > 0) {
    this.languagesToApply.push(...answers.languages);
  }
}
