import re
import os

from operator import itemgetter

directory = "polyedres"

tab = '    '

names = ["uniform", "dualunif", "johnson", "stcuboctaedre", "stdodecaedreRhb", "sticosaedre", "sttriacontaedreRhb", "zonoedre"]
files = os.listdir(directory)

def readFile(fileName, end = False):
    name = ''
    vertexString = ''
    edgeString = ''
    faceString = ''

    vertex = False
    edge = False
    face = False
    with open(directory + '/' + fileName, 'r', encoding = 'utf-8') as fileR:
        currentLine = fileR.readline()
        while currentLine != '':
            if vertex == True:
                if ']]' in currentLine:
                    vertexString += '                   ' + currentLine[:-3].replace(',', ', ') + '\n'
                    vertexString += '                  ],\n'
                else:
                    vertexString += '                   ' + currentLine[:-2].replace(',', ', ') + ',\n'
            elif face == True:
                currentLine = currentLine[10:-5].replace(',[[', ',[').replace(']],', '],')
                faceString = 2*tab + '"face": [\n                 ' + '],\n                 ['.join([chaine.replace(',', ', ') for chaine in currentLine.split('],[')]) + ']\n                ]\n'
                face = False
            elif edge == True:
                currentLine = currentLine[9:-4].replace('], ', '],')
                edgeString = 2*tab + '"edge": [\n                 ' + '],\n                 ['.join([chaine.replace(',', ', ') for chaine in currentLine.split('],[')]) + ']\n                ],\n'
                edge = False

            currentLine = fileR.readline()
            if currentLine.startswith('"name"'):
                currentLine = currentLine.replace('"name" :', '"name":')
                currentLine = currentLine[:8] + currentLine[8:].replace(' ', '\u00A0')
                name += 2*tab + currentLine
            elif currentLine.startswith('"vertex"'):
                vertex = True
                edge = False
                face = False

                vertexString += 2*tab + '"vertex": [\n'
                vertexString += '                   ' + '[' + currentLine.split('[[')[1][:-2].replace(',', ', ') + ',\n'
                currentLine = fileR.readline()
            elif currentLine.startswith('"face"'):
                vertex = False
                edge = False
                face = True
            elif currentLine.startswith('"edge"'):
                vertex = False
                edge = True
                face = False

    return name + vertexString + edgeString + faceString

for name in names:
    i = 1
    fileW = open(name + '.js', 'w')
    #fileW.write('const dic = {\n') # mode pretty
    fileW.write('const dic = {') # mode compact
    while name + str(i) + '.js' in files:
        print('Formating ' + name + str(i) + '.js...')
        #fileW.write(tab + '"' + str(i) + '": {\n' + readFile(name + str(i) + '.js', not name + str(i+1) + '.js' in files) + '    },\n') # mode pretty
        fileW.write('"' + str(i) + '":{' + readFile(name + str(i) + '.js', not name + str(i+1) + '.js' in files).replace(' ', '').replace('\n', '') + '},') # mode compact
        i += 1
    fileW.write('};')
    fileW.close()
