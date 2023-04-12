import clsx from 'clsx'
import Input from 'components/Input'
import Text from 'components/Text'
import { Check, Wrench } from 'lucide-react'
import React from 'react'

import { ModelConfig } from 'state/model'
import { ModelInfo } from 'state/store'

interface Props {
  isSelected?: boolean
  select: (config: Omit<ModelInfo, 'name' | 'provider'>) => void
  model: Omit<ModelConfig, 'provider'>
  modelInfo?: ModelInfo
}

function ModelCard({
  isSelected,
  select,
  model,
  modelInfo,
}: Props) {
  return (
    <div
      className={clsx(
        {
          'border-green-800 text-slate-600 shadow-sm': isSelected,
          'bg-white border-slate-300 text-slate-400': !isSelected,
        },
        `
        relative
        flex
        min-h-[50px]
        cursor-pointer
        rounded
        p-2
        border
        hover:text-slate-600
        hover:border-green-800
        `)}
      onClick={() => select({
        userArgs: {
          ...modelInfo?.userArgs,
        }
      })}
    >
      <div className="
        flex
        w-full
        items-center
        justify-between
      ">
        <div className="
          flex
          items-start
          flex-col
          space-y-2
          ">
          <div className="
            text-sm
            items-center
            font-medium
          ">
            {model.name}
          </div>
          {Object
            .entries(model.args || {})
            .filter(([, value]) => value.editable).length > 0 &&
            <>
              <Text
                text="Configuration"
                className="font-medium pt-3"
                icon={<Wrench size="16px" />}
                size={Text.size.S3}
              />
              <div className="
              flex
              flex-col
              space-y-2
            "
              >
                {Object.entries(model.args || {})
                  .filter(([, value]) => value.editable)
                  .map(([key, value]) =>
                    <div
                      key={key}
                    >
                      <Input
                        value={modelInfo?.userArgs[key]?.toString() || ''}
                        onChange={v => select({
                          userArgs: {
                            ...modelInfo?.userArgs,
                            [key]: value.type === 'number' ? parseFloat(v) : v,
                          }
                        })}
                        label={value.label || key}
                      />
                    </div>
                  )}
              </div>
            </>
          }
        </div>
        {isSelected && (
          <div className="shrink-0 text-green-800">
            <Check size="20px" />
          </div>
        )}
      </div>
    </div >
  )
}

export default ModelCard