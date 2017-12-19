export function wddProgress () {
    return {
        scope: {
            workspaceName: '@',
            requestData: '@',
            censusesData: '@'
        },
        template: `
        <div class="wdd-progress">
            <div class="progress-header">
                <span class="workspace-name">{{workspaceName}}</span>
                <span class="data-request">{{requestData}} Dati Richiesti</span>
            </div>
            <div class="progress-line">
                <div class="active-line" ng-style="{'width': percentage}">
                    <div class="line-label">
                        <div class="censuses-number">{{censusesData}}</div>
                        <div class="censuses-body">Dati Censiti</div>
                    </div>
                </div>
            </div>
        </div>
        `,
        link: (scope) => {
            scope.percentage = `${(Number(scope.censusesData) / Number(scope.requestData)) * 100}%`;
        }
    };
}
