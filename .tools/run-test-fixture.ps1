param([int]$Port = 18083)
$ErrorActionPreference = 'Stop'
$repo = Split-Path $PSScriptRoot -Parent
if (-not $env:JAVA_HOME) { throw 'Configurá JAVA_HOME con un JDK 21.' }
$classpathFile = Join-Path $repo 'target/test-classpath.txt'
if (-not (Test-Path -LiteralPath $classpathFile)) { throw 'Run .\mvnw.cmd -Pproduction package dependency:build-classpath "-Dmdep.includeScope=test" "-Dmdep.outputFile=target/test-classpath.txt" first.' }
$classpath = (Join-Path $repo 'target/test-classes') + ';' + (Join-Path $repo 'target/classes') + ';' + (Get-Content -Raw -LiteralPath $classpathFile).Trim()
Push-Location $repo
try {
    & (Join-Path $env:JAVA_HOME 'bin/java.exe') -cp $classpath roadmap.fixture.TestFixtureApplication "--server.port=$Port"
    exit $LASTEXITCODE
} finally { Pop-Location }
