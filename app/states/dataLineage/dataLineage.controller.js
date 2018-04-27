import ModelloDatiPdf from '../../public/Modello_dati.pdf';
import { saveAs } from 'file-saver';

export class DataLineageController {

    lineageBoxes = Array(9);

    // Default view: Data Lineage
    currentView = 0;

    constructor (LineageService, $state, $stateParams, ModalService) {
        'ngInject';
        this.$state = $state;
        this.lineageService = LineageService;
        this.$stateParams = $stateParams;
        this.modalService = ModalService;

        // TODO per l'init recuperare il termId dai parametri dello state
        this.initLineage();
    }

    initLineage () {
        let draft = this.$stateParams.isDraft === 'true';
        if (this.$stateParams.type === 'F') {
            this.getLineageField(this.$stateParams.id, draft);
        } else if (this.$stateParams.type === 'R') {
            this.getLineageRule(this.$stateParams.id, draft);
        }
    }

    goToRuleState (termId, draft) {
        this.$state.go('.', {id: termId, type: 'R', isDraft: draft, workspaceId: this.$stateParams.workspaceId});
    }

    goToFieldState (termId, draft) {
        this.$state.go('.', {id: termId, type: 'F', isDraft: draft, workspaceId: this.$stateParams.workspaceId});
    }

    getLineageField (termId, draft) {
        this.getLineageFieldPromise = this.lineageService.getLineageField(termId, draft);
        this.getLineageFieldPromise.then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.tech_hierarchy) {
                this.lineageBoxes[1] = {
                    title: 'Technical Hierarchy',
                    data: res.data.tech_hierarchy,
                    showType: true
                };
                this.lineageBoxes[1] = this.setColorClass(this.lineageBoxes[1]);
                this.lineageBoxes[1] = this.setTooltip(this.lineageBoxes[1]);
            }

            if (res.data.tech_rules_in && res.data.tech_rules_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_in,
                    operation: this.goToRuleState.bind(this)
                };
                this.lineageBoxes[3] = this.setColorClass(this.lineageBoxes[3]);
                this.lineageBoxes[3] = this.setTooltip(this.lineageBoxes[3]);
            }

            this.lineageBoxes[4] = {
                title: 'Data Field',
                data: res.data.data_field,
                contentBold: true,
                infoOperation: this.goToDataDetail.bind(this)
            };
            this.lineageBoxes[4] = this.setColorClass(this.lineageBoxes[4]);
            this.lineageBoxes[4] = this.setTooltip(this.lineageBoxes[4]);

            if (res.data.tech_rules_out && res.data.tech_rules_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_out,
                    operation: this.goToRuleState.bind(this)
                };
                this.lineageBoxes[5] = this.setColorClass(this.lineageBoxes[5]);
                this.lineageBoxes[5] = this.setTooltip(this.lineageBoxes[5]);
            }

            if (res.data.other_relations && res.data.other_relations[0]) {
                this.lineageBoxes[7] = {
                    title: res.data.other_relations[0].title,
                    data: res.data.other_relations[0],
                    operation: null
                };
                this.lineageBoxes[7] = this.setColorClass(this.lineageBoxes[7]);
                this.lineageBoxes[7] = this.setTooltip(this.lineageBoxes[7]);
            }

            if (res.data.other_relations && res.data.other_relations[1]) {
                this.lineageBoxes[6] = {
                    title: res.data.other_relations[1].title,
                    data: res.data.other_relations[1],
                    operation: null
                };
                this.lineageBoxes[6] = this.setColorClass(this.lineageBoxes[6]);
                this.lineageBoxes[6] = this.setTooltip(this.lineageBoxes[6]);
            }

            if (res.data.other_relations && res.data.other_relations[2]) {
                this.lineageBoxes[8] = {
                    title: res.data.other_relations[2].title,
                    data: res.data.other_relations[2],
                    operation: null
                };
                this.lineageBoxes[8] = this.setColorClass(this.lineageBoxes[8]);
                this.lineageBoxes[8] = this.setTooltip(this.lineageBoxes[8]);
            }
            this.getArrowTooltip();
        });
    }

    getLineageRule (ruleId, draft) {
        this.getLineageRulePromise = this.lineageService.getLineageRule(ruleId, draft);
        this.getLineageRulePromise.then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.business_rule && res.data.business_rule.label) {
                this.lineageBoxes[1] = {
                    title: 'Business Rule',
                    data: res.data.business_rule,
                    hasDescription: true,
                    operation: null
                };
                this.lineageBoxes[1] = this.setColorClass(this.lineageBoxes[1]);
                this.lineageBoxes[1] = this.setTooltip(this.lineageBoxes[1]);
            }

            if (res.data.data_field_in && res.data.data_field_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Data Field',
                    data: res.data.data_field_in,
                    operation: this.goToFieldState.bind(this)
                };
                this.lineageBoxes[3] = this.setColorClass(this.lineageBoxes[3]);
                this.lineageBoxes[3] = this.setTooltip(this.lineageBoxes[3]);
            }

            this.lineageBoxes[4] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                contentBold: true,
                hasDescription: true,
                infoOperation: this.goToDataDetail.bind(this)
            };
            this.lineageBoxes[4] = this.setColorClass(this.lineageBoxes[4]);
            this.lineageBoxes[4] = this.setTooltip(this.lineageBoxes[4]);

            if (res.data.data_field_out && res.data.data_field_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Data Field',
                    data: res.data.data_field_out,
                    operation: this.goToFieldState.bind(this)
                };
                this.lineageBoxes[5] = this.setColorClass(this.lineageBoxes[5]);
                this.lineageBoxes[5] = this.setTooltip(this.lineageBoxes[5]);
            }

            if (res.data.program && res.data.program.length > 0) {
                this.lineageBoxes[7] = {
                    title: 'Program',
                    data: res.data.program,
                    operation: null
                };
                this.lineageBoxes[7] = this.setColorClass(this.lineageBoxes[7]);
                this.lineageBoxes[7] = this.setTooltip(this.lineageBoxes[7]);
            }
            this.getArrowTooltip();
        });
    }

    back () {
        window.history.back();
    }

    goToDataDetail (termId, draft) {
        this.modalService.openMDDataDetail(termId, draft, this.$stateParams.workspaceId);
    }

    setColorClass (object) {
        switch (object.title) {
            case 'Process Owner':
            case 'Responsible User':
            case 'System Owner':
                object.colorClass = 'color-green';
                break;
            case 'Business Glossary':
            case 'Business Data':
            case 'Business Rule':
                object.colorClass = 'color-orange';
                break;
            case 'Technical Application':
            case 'Data Source':
            case 'Data Table':
            case 'Technical Hierarchy':
            case 'Technical Rule':
            case 'Data Field':
                object.colorClass = 'color-blue';
                break;
            default:
                object.colorClass = '';
                break;
        }
        return object;
    }

    setTooltip (object) {
        switch (object.title) {
            case 'Process Owner':
                object.tooltip = 'Utente responsabile del dato di business. Coincide con il c.d. Data Owner identificato dalla circolare 285 di Banca di Italia.';
                break;
            case 'Responsible User':
                object.tooltip = 'Assume formalmente la responsabilità, in rappresentanza degli utenti e nei rapporti con i System Owner. Supporta i Process Owner mediante presidio di 1 livello dei dati trattati dalle procedure di propria responsabilità.';
                break;
            case 'System Owner':
                object.tooltip = 'Capo Settore (UBI.S) collegato in organigramma alla Unità Operativa referente della componente applicazione.';
                break;
            case 'Business Glossary':
                object.tooltip = 'Termine di business avente significato unico a livello di gruppo con il quale viene descritto il';
                break;
            case 'Business Data':
                object.tooltip = 'Dato del Sistema Direzionale definito come "rilevante"';
                break;
            case 'Business Rule':
                object.tooltip = 'Descrizione del requisito di business che viene implementato dalla relativa technical rule.';
                break;
            case 'Technical Application':
                object.tooltip = 'Codice identificativo dell’applicazione secondo il catalogo interno UBIS. Indica un aggregato di una o più componenti architetturali (componenti applicative)';
                break;
            case 'Data Source':
                object.tooltip = 'Nome dell’archivio che contiene i dati del sistema informativo (Database, Flusso, Routine, Report, Web Services, External File, Data Entries)';
                break;
            case 'Data Table':
                object.tooltip = 'Nome della tabella (di un database) che contiene il dato';
                break;
            case 'Technical Hierarchy':
                object.tooltip = '';
                break;
            case 'Technical Rule':
                object.tooltip = 'Contiene la descrizione delle regole tecniche di creazione/ calcolo di uno specifico dato.';
                break;
            case 'Data Field':
                object.tooltip = 'Dato elementare del sistema informativo.';
                break;
            case 'Program':
                object.tooltip = 'Programmi e procedure tecniche che generano il Business Data';
                break;
            case 'Utente Richiedente':
                object.tooltip = 'Utente di business che richiede il censimento informativo dei dati';
                break;
            default:
                object.tooltip = '';
                break;
        }
        return object;
    }

    getModelloDatiPdfByteArray () {
        return this.$http({
            method: 'GET',
            url: ModelloDatiPdf,
            responseType: 'arraybuffer'
        });
    }

    downloadModelloDati () {
        this.getModelloDatiPdfByteArray().then((res) => {
            let data = res.data;
            let contentType = 'application/pdf';
            let urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;

            if (urlCreator) {
                try {
                    let file = new File([data], 'Modello_dati.pdf', { type: contentType });
                    saveAs(file);
                } catch (err) {
                    let fileBlob = new Blob([data], { type: contentType });
                    window.navigator.msSaveBlob(fileBlob, 'Modello_dati.pdf');
                }
            }
        });
    }

    getArrowTooltip () {
        if (typeof this.lineageBoxes[1] !== undefined && this.lineageBoxes[1].title === 'Technical Hierarchy' 
            && typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Data Field') {
            this.lineageBoxes[1].arrowTooltip = 'Gerarchia tecnica/Owner';
        } 
        if (typeof this.lineageBoxes[1] !== undefined && this.lineageBoxes[1].title === 'Business Rule'
            && typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Technical Rule') {
            this.lineageBoxes[1].arrowTooltip = 'Implementata in';
        } 
        if (typeof this.lineageBoxes[3] !== undefined && this.lineageBoxes[3].title === 'Technical Rule'
            && typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Data Field') {
            this.lineageBoxes[3].arrowTooltip = 'Produce';
        }
        if (typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Technical Rule'
            && typeof this.lineageBoxes[5] !== undefined && this.lineageBoxes[5].title === 'Data Field') {
            this.lineageBoxes[5].arrowTooltip = 'Elabora';
        }
        if (typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Technical Rule'
            && typeof this.lineageBoxes[3] !== undefined && this.lineageBoxes[3].title === 'Data Field') {
            this.lineageBoxes[3].arrowTooltip = 'Elabora';
        }
        if (typeof this.lineageBoxes[7] !== undefined && this.lineageBoxes[7].title === 'Business Data'
            && typeof this.lineageBoxes[4] !== undefined && this.lineageBoxes[4].title === 'Data Field') {
            this.lineageBoxes[7].arrowTooltip = 'Disponibile in';
        }
        if (typeof this.lineageBoxes[7] !== undefined && this.lineageBoxes[7].title === 'Business Data'
            && typeof this.lineageBoxes[6] !== undefined) {
            if (this.lineageBoxes[6].title === 'Business Glossary') {
                this.lineageBoxes[6].arrowTooltip = 'Descritto da';
            } else if (this.lineageBoxes[6].title === 'Process Owner') {
                this.lineageBoxes[6].arrowTooltip = 'Fa capo a';
            }
        }
        if (typeof this.lineageBoxes[7] !== undefined && this.lineageBoxes[7].title === 'Business Data'
            && typeof this.lineageBoxes[8] !== undefined) {
            if (this.lineageBoxes[8].title === 'Business Glossary') {
                this.lineageBoxes[8].arrowTooltip = 'Descritto da';
            } else if (this.lineageBoxes[8].title === 'Process Owner') {
                this.lineageBoxes[8].arrowTooltip = 'Fa capo a';
            }
        }
    }
}
